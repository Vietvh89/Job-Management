# JobFlow – Supabase + Netlify

Repository `Vietvh89/Job-Management`; Netlify `jobflow-studio-viet`; Supabase project `lqboqzhjhepeyirdfctp`.

## Bắt đầu

1. Supabase → Authentication → URL Configuration: Site URL `https://jobflow-studio-viet.netlify.app`, Redirect URLs thêm `https://jobflow-studio-viet.netlify.app/`. Giữ bật xác nhận email.
2. Mở website, chọn **Tạo tài khoản** bằng `viet.vu@crowe.vn`, tự đặt mật khẩu rồi xác nhận email. Sau đó đăng nhập. Chưa có tài khoản/mật khẩu được tạo sẵn.
3. Email trên đã được cấp `admin` trong `jobflow_members`. Người khác đăng ký Auth không tự có quyền đọc/sửa.
4. Vào **Settings → Staff Master**, nhập email đăng nhập cho nhân sự (ban đầu để trống), chọn Active/Inactive.
5. Vào **Settings → Group Access** để tạo/sửa bộ quyền. Có sẵn Manager, Team member và Read only.
6. Vào **Settings → Privileges**, chọn nhân sự, gán Group Access và chọn Special Permission nếu muốn ghi đè quyền nhóm; lưu sau khi xác nhận. User đăng ký bằng đúng email đã nhập, xác nhận email rồi đăng nhập. Lưu quyền không tự gửi thư mời.
7. Account Owner có toàn quyền và quản lý nhóm/user; không thể tự hạ quyền chính mình. Staff Master, Templates và Board Views chỉ Account Owner được sửa. Các thành viên khác có thể được cấp quyền xem các mục Setting đó.

Supabase SMTP mặc định giới hạn gửi mail, thường chỉ gửi tới thành viên được phép của project. Khi mở rộng nhân sự cần SMTP riêng. Không tắt xác nhận email để chữa lỗi gửi mail. Không gửi mật khẩu cho người triển khai.

Netlify có thể vẫn yêu cầu đăng nhập team. Mở truy cập chỉ trong Visitor access của project này. Trang đăng nhập có thể công khai; dữ liệu Supabase chỉ dành cho thành viên được cấp quyền.

## Dữ liệu chung

- Dữ liệu hoạt động lưu trong `jobflow_workspace`; trình duyệt gọi RPC `jobflow_access`, không đọc/ghi trực tiếp bảng. Máy chủ kiểm tra thành viên đang active, nhóm và override mỗi lần gọi; trả về dữ liệu trong phạm vi được cấp và chỉ hợp nhất các trường được phép sửa. Không tự seed khi máy chủ lỗi.
- Đã nạp 28 job và dữ liệu liên quan từ bản Sites 29. Thay đổi chỉ nằm trong trình duyệt cũ chưa được chuyển.
- Lưu toàn workspace dạng JSONB để giữ nguyên quan hệ job/phase/task/subtask/milestone/template/nhân sự. Phù hợp workspace nhỏ; chưa phải các bảng chuẩn hóa cho quy mô lớn.
- Mỗi lần lưu kiểm tra revision; bản cũ không ghi đè bản mới. Lỗi mạng/xung đột sẽ chặn chỉnh sửa tiếp, cho tải bản thay đổi và tải lại dữ liệu máy chủ. File phục hồi dùng để đối chiếu; chưa có tự nhập/merge. Không hỗ trợ sửa offline.
- Hộp thoại chờ máy chủ xác nhận mỗi lần lưu. Kiểm tra thay đổi mỗi 15 giây; bấm **Tải dữ liệu mới** và xác nhận để nhận bản mới. Thay đổi quyền sẽ yêu cầu tải lại phiên. Quyền mới áp dụng ngay tại máy chủ, kể cả khi trình duyệt còn dữ liệu cũ.
- Lịch sử job ghi email đăng nhập; database đóng dấu `updated_by`/thời gian lần lưu cuối. Lịch sử trong JSON chưa phải audit log chống chỉnh sửa.
- Tài liệu vẫn nằm trong JSON dạng data URL. Giới hạn frontend 7,5 MB/toàn workspace, database 8 MB. Chưa dùng Supabase Storage.
- SDK lưu phiên đăng nhập trong localStorage; workspace ở bộ nhớ. Code còn chứa dữ liệu mẫu đã được đồng ý công khai.

## Chạy và triển khai

Node.js 22 trở lên:

```sh
npm ci
npm run build
npm test
npm start
```

Mở `http://localhost:3000`. Server local chỉ để kiểm tra. Thêm URL local vào Supabase Redirect URLs nếu dùng email redirect ở local.

Netlify: branch `main`, build `npm run build`, publish `public`. Build chép SDK Supabase khóa phiên bản từ node_modules vào `public/vendor/`. GitHub Pages và Vercel cũng cần build. Không chỉnh `dist/` hoặc vendor thủ công.

`public/cloud-config.js` chứa URL và publishable key công khai. Không thêm service-role/secret key vào frontend/GitHub.

`supabase/schema.sql` lưu DDL migration `jobflow_shared_workspace` đã áp dụng; không chạy lại trên database đã có bảng. Với project mới: áp dụng schema trên database trống, cập nhật email admin/cấu hình public, chạy `node scripts/export-seed.cjs`, nhập JSON sinh ra vào row id `main` bằng công cụ quản trị. Sau khi có row `main`, chạy `supabase/migrations/20260910041537_access_groups.sql`. Không chạy lại migration đã áp dụng. Client không tự seed; Account Owner quản lý thành viên qua RPC kiểm tra quyền. `tests/access.sql` chạy sau migration trong transaction `BEGIN` / `ROLLBACK` để kiểm tra quyền, không giữ lại tài khoản thử.

## Kiểm tra và giới hạn

62 kiểm tra logic kế thừa và kiểm tra cloud bằng client giả lập. Kiểm tra database bằng transaction rollback: admin được đọc/ghi, outsider bị chặn, revision cũ không ghi, anon không có SELECT. Chưa kiểm thử email đăng nhập thực tế bằng hai tài khoản; cần người dùng xác nhận email và thử lưu trên hai trình duyệt. Chưa kiểm thử tải.

[Supabase Auth](https://supabase.com/docs/guides/auth/passwords) · [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Netlify](https://docs.netlify.com/start/quickstarts/deploy-from-repository/)

## Quy tắc phân quyền

- No Access / View Access / Create-Edit / Full Access (bao gồm xóa). Các mục chỉ có giao diện xem không cung cấp mức sửa. Quyền Job là giới hạn chung cho sửa nội dung job; quyền Completed Jobs và Job Archive bổ sung giới hạn với job Complete/Cancelled.
- Special Permission ghi đè Group Access, kể cả No Access. None và không override nghĩa là không được cấp quyền.
- View Assigned Jobs dựa trên staff ID, owner, teamMemberIds hoặc short name của nhân sự liên kết với email đăng nhập. Người không được cấp quyền không thể mở toàn bộ dữ liệu bằng API.
- Tên/ID nhân sự, tên khách hàng trên job, template và định nghĩa Board vẫn là dữ liệu tham chiếu cần thiết trong các job được phép xem. No Access ở Staff Master/Client/Template/Board Settings chặn phần quản trị tương ứng; thông tin liên hệ nhân sự/khách hàng được lọc riêng.
- Staff hoặc User Inactive không đăng nhập/đọc/ghi được. Thay đổi email của nhân sự sẽ ngắt quyền email cũ; vào Privileges lưu lại để liên kết email mới.
- Group đang gán user không được xóa; cần gán lại user trước. Lịch sử thay đổi quyền được lưu riêng trong schema private.
- Collaboration Manager chưa có trong ứng dụng và được ghi rõ là không khả dụng.
- Bộ kiểm thử gồm hồi quy chức năng, UI quyền, cloud RPC và SQL với vai trò authenticated. Trình duyệt kiểm tra cục bộ bị chặn trong phiên triển khai; chưa kiểm tra trực quan hoặc đăng nhập bằng tài khoản thật.
