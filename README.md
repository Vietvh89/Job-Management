# JobFlow – mã nguồn triển khai độc lập

Xuất từ bản Sites đã công khai ngày 09/09/2026, phiên bản 29. Giữ nguyên HTML/CSS/JavaScript và dữ liệu khởi tạo của ứng dụng. Không cần tài khoản ChatGPT để chạy bản này. Không thay đổi website Sites hiện tại.

## Đọc trước khi sử dụng

Đây là website tĩnh hoạt động trên trình duyệt, **chưa phải hệ thống dùng chung dữ liệu cho nhiều nhân sự**.

- Dữ liệu thay đổi được lưu trong `localStorage` của từng trình duyệt và từng tên miền. Không có máy chủ cơ sở dữ liệu, đăng nhập thật hoặc phân quyền.
- Tên người dùng/Administrator trong giao diện không phải cơ chế xác thực.
- Máy khác, trình duyệt khác hoặc tên miền mới sẽ không tự thấy dữ liệu bạn đã sửa ở website cũ. Xóa dữ liệu trình duyệt có thể làm mất thay đổi.
- Gói này gồm dữ liệu khởi tạo nằm trong code; không chứa các thay đổi chỉ có trong trình duyệt của bạn. Chức năng Export selected JSON hiện có chỉ xuất job được chọn, không phải sao lưu đầy đủ toàn hệ thống và chưa có quy trình nhập toàn bộ.
- Các file frontend và dữ liệu khởi tạo có thể được người truy cập tải xuống. Bạn đã xác nhận công khai dữ liệu; vẫn nên rà soát trước khi đưa repo public. Repo private không làm dữ liệu frontend trên website công khai trở thành riêng tư.
- Không có API key, mật khẩu hoặc thông tin xác thực Sites trong gói xuất. Không đưa secret/service-role key vào frontend hoặc GitHub.

## Cách nhanh nhất: GitHub + Netlify

1. Giải nén file ZIP.
2. Tạo repository mới trên GitHub, ví dụ `jobflow-studio-viet`.
3. Upload **nội dung bên trong thư mục `jobflow-github`** lên root repository: `public`, `scripts`, `tests`, `package.json`, `README.md`, `netlify.toml`, `vercel.json` và các file/thư mục dấu chấm nếu sử dụng. Không chỉ upload file ZIP; không lồng thêm thư mục `jobflow-github`.
4. Netlify: chọn **Add new project → Import an existing project → GitHub**, cấp quyền cho đúng repo và chọn repo vừa tạo.
5. Base directory: để trống. Build command: để trống. Publish directory: `public`. File `netlify.toml` đã khai báo thư mục này.
6. Chọn Publish. Kiểm tra quyền truy cập dự án nếu muốn website công khai. Mỗi lần cập nhật nhánh triển khai trên GitHub, Netlify có thể tự phát hành lại.

Nếu chỉ muốn kéo thả, dùng Netlify Drop và kéo **thư mục `public` đã giải nén**. Cách này không tự đồng bộ code từ GitHub.

Tài liệu chính thức: [Deploy từ repository](https://docs.netlify.com/start/quickstarts/deploy-from-repository/).

## Vercel

Import cùng repo vào Vercel, để Root Directory ở gốc repo. Chọn Framework Preset `Other`, Build Command `npm run build`, Output Directory `dist`. Cấu hình tương ứng đã có trong `vercel.json`. Không cần biến môi trường cho bản tĩnh này.

[Cấu hình build Vercel](https://vercel.com/docs/builds/configure-a-build).

## GitHub Pages

Gói có `.github/workflows/pages.yml`. Bảo đảm upload cả file này (thư mục dấu chấm có thể bị ẩn trên máy). Trong repo: **Settings → Pages → Source: GitHub Actions**. Dùng nhánh `main`; nếu tên khác, sửa `branches` trong workflow. Sau khi bật Pages, chạy workflow từ tab Actions hoặc push một commit mới. Workflow xuất bản riêng thư mục `public`.

Đường dẫn asset tương đối nên dùng được ở URL dạng `https://TEN-TAI-KHOAN.github.io/TEN-REPO/`. Khả năng dùng Pages cho repo private phụ thuộc gói tài khoản GitHub.

[Workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Chạy trên máy để sửa code

Cài Node.js 22 trở lên. Mở terminal tại thư mục chứa `package.json`:

```sh
npm start
```

Mở `http://localhost:3000`. Không cần `npm install` vì dự án không có thư viện npm phụ thuộc. Máy chủ này chỉ phục vụ kiểm tra cục bộ, không phải production server.

```sh
npm test
npm run build
```

`npm test` kiểm tra cú pháp và bộ kiểm tra logic kế thừa. Không thay thế kiểm thử trình duyệt, kiểm thử tải hay đánh giá bảo mật. `npm run build` chép bốn file frontend vào `dist` để đưa lên hosting tĩnh khác. Chỉnh code trong `public`, không chỉnh bản sao `dist`.

## Supabase dùng để làm gì?

Gói này **chưa kết nối Supabase**. Upload code lên GitHub hoặc nhập URL/key Supabase không tự tạo cơ sở dữ liệu và đồng bộ.

Hướng triển khai cho nhiều người: frontend trên Netlify/Vercel; backend dùng Supabase cho Auth, database và chính sách truy cập. Supabase không phải đích upload frontend của gói này; tài liệu cũng lưu ý custom domain không nhằm phục vụ hosting frontend qua Edge Functions.

Để chuyển thành hệ thống nhiều người dùng, cần một đợt phát triển riêng: thiết kế bảng jobs/phases/tasks/subtasks/milestones/clients/staff/templates/board views/history; xây dựng đăng nhập và quyền xem/sửa; bật Row Level Security; thay các hàm đọc/ghi localStorage bằng API; xử lý cập nhật đồng thời; nhập dữ liệu cũ có kiểm tra; sao lưu và kiểm thử bằng ít nhất hai tài khoản. Công khai quyền xem không đồng nghĩa cho phép người lạ sửa/xóa dữ liệu.

[Giới hạn custom domain Supabase](https://supabase.com/docs/guides/platform/custom-domains).

## Nội dung gói

| Đường dẫn | Mục đích |
| --- | --- |
| `public/index.html` | Khung giao diện |
| `public/styles.css` | Định dạng giao diện |
| `public/app.js` | Logic và dữ liệu khởi tạo |
| `public/staff-data.js` | Dữ liệu nhân sự khởi tạo |
| `scripts/` | Chạy thử và tạo bản build |
| `tests/audit.cjs` | Kiểm tra logic hiện có |
| `netlify.toml`, `vercel.json` | Cấu hình hosting |
| `.github/workflows/pages.yml` | Triển khai GitHub Pages |

Các cập nhật Calendar deadline task/subtask và bộ lọc, cùng việc bỏ hai tab Client size criteria/Standard hours và các nội dung liên quan, được giữ theo bản đang công khai. Gói không chứa lịch sử Git hay cấu hình riêng của Sites.
