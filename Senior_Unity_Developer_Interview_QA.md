# BỘ CÂU HỎI PHỎNG VẤN & CÂU TRẢ LỜI CHO SENIOR UNITY DEVELOPER & LEAD DEVELOPER

> **Tài liệu chuẩn bị phỏng vấn**: Tổng hợp các câu hỏi chuyên sâu về Kiến trúc phần mềm, Tối ưu hiệu năng, Quản lý bộ nhớ, Game Engine, SDK/Publishing và Kỹ năng Quản lý dự án (Lead/PM).

---

## MỤC LỤC
1. [Phần 1: Kiến trúc Phần mềm & Thiết kế Hệ thống (Architecture & System Design)](#phan-1)
2. [Phần 2: Tối ưu Hiệu năng & Bộ nhớ (Performance & Memory Management)](#phan-2)
3. [Phần 3: Vật lý, Render Pipeline & Graphics (Physics & Graphics)](#phan-3)
4. [Phần 4: Lập trình Bất đồng bộ & Xử lý Dữ liệu (Async, Multithreading & Data)](#phan-4)
5. [Phần 5: SDK, Publishing & Product Analytics (Firebase, Ads, LiveOps)](#phan-5)
6. [Phần 6: Quản lý Dự án & Kỹ năng Lead (Lead Dev & PM Questions)](#phan-6)

---

<a id="phan-1"></a>
## PHẦN 1: KIẾN TRÚC PHẦN MỀM & THIẾT KẾ HỆ THỐNG

### Q1: Bạn hãy giải thích kiến trúc Observers/EventBus trong Unity và khi nào NÊN hoặc KHÔNG NÊN dùng?
* **Câu trả lời mẫu**:
  * **Khái niệm**: EventBus/Observer cho phép decouple (giảm sự phụ thuộc) giữa các hệ thống (ví dụ: khi Player mất máu, `PlayerHealth` chỉ cần bắn event `OnPlayerDied`, các hệ thống khác như `UIManager`, `AudioManager`, `QuestManager` tự lắng nghe và xử lý mà không cần tham chiếu trực tiếp đến nhau).
  * **Ưu điểm**: Code mô-đun hóa cao, dễ mở rộng tính năng mới mà không sửa code cũ (Open-Closed Principle).
  * **Nhược điểm & Rủi ro**: 
    * Dễ gây Memory Leak nếu quên Unsubscribe khi GameObject bị `Destroy()` hoặc Scene Unload.
    * Khó trace bug (Khó xem Luồng gọi hàm - Stack Trace) nếu event được phát ra ở nhiều nơi.
  * **Kinh nghiệm Senior**: Luôn Unsubscribe trong `OnDisable()` hoặc `OnDestroy()`. Sử dụng `Cysharp.UniTask` hoặc C# Action/Delegate có quy chuẩn đặt tên rõ ràng (ví dụ: `On[Action]Changed`).

---

### Q2: Sự khác biệt giữa Addressables Asset System và AssetBundles truyền thống là gì? Vì sao các game lớn chọn Addressables?
* **Câu trả lời mẫu**:
  * **AssetBundles truyền thống**: Lập trình viên phải tự quản lý thủ công phụ thuộc tài nguyên (Asset Dependencies), tự quản lý luồng tải, lưu caching và gián tiếp gây Duplicate Assets nếu 2 bundle chứa chung 1 prefab/texture.
  * **Addressables Asset System**: Xây dựng trên nền AssetBundles nhưng tự động hóa quản lý reference, quản lý bộ nhớ qua Reference Counting (tự động unload khi count = 0), hỗ trợ load async bằng chuỗi Key/Address đơn giản.
  * **Ứng dụng thực tế**: Giảm dung lượng APK/AAB ban đầu xuống dưới mốc mạo hiểm (VD: từ 180MB xuống 75MB), hỗ trợ phân phối DLC/Resource từ CDN (Remote Assets) mà không cần build lại app.

---

### Q3: Bạn thiết kế hệ thống Custom Editor Tool trong Unity như thế nào để hỗ trợ team Game Design / Art?
* **Câu trả lời mẫu**:
  * **Mục tiêu**: Giảm thiểu lỗi con người (Human Error), tự động hóa các thao tác lặp lại và cho phép Game Design tạo level/balance chỉ số mà không cần đụng vào code.
  * **Công nghệ sử dụng**: `UnityEditor`, `Odin Inspector`, `ScriptableObject`.
  * **Ví dụ thực tế**:
    1. **Custom Level Editor**: Cho phép GD kéo thả các Block/Grid trên Scene view, tự động sinh mã Json/ScriptableObject lưu thông số màn chơi.
    2. **Auto Packaging & Importer Tool**: Tự động set chuẩn Texture Compression (ASTC/ETC2), Max Size và Sprite Slice theo chuẩn studio ngay khi Art quăng file `.png` vào project.

---

<a id="phan-2"></a>
## PHẦN 2: TỐI ƯU HIỆU NĂNG & BỘ NHỚ (PERFORMANCE & MEMORY)

### Q4: Làm thế nào để đạt 60 FPS ổn định trên các thiết bị cấu hình thấp (Low-End Devices)?
* **Câu trả lời mẫu**:
  * Tối ưu 60 FPS đòi hỏi tối ưu đồng thời cả **CPU** (Game logic, Draw calls, GC) và **GPU** (Fill rate, Shaders, Pass rendering).
  * **Về phía CPU**:
    * Giảm Draw Calls bằng **SRP Batcher** (với URP), **GPU Instancing** (cho vật thể lặp lại như cây cối, cỏ) hoặc **Sprite Atlas** (cho 2D UI).
    * Giảm Garbage Collection (GC): Sử dụng **Object Pooling** cho đạn, hiệu ứng, quái vật; tránh dùng LINQ hoặc chuỗi String concatenation trong `Update()`.
  * **Về phía GPU**:
    * Sử dụng **ASTC Texture Compression** (bản nén tối ưu nhất cho Android/iOS).
    * Tối ưu Shader: Dùng Mobile Unlit hoặc Simple Lit, tránh Transparent Overdraw (nhiều lớp UI/VFX trong suốt đè lên nhau).
    * Bật **Occlusion Culling** loại bỏ render các vật thể bị che khuất trong môi trường 3D.

---

### Q5: Trái tim của việc ngắt giật (Spike / Lag) trong Unity thường do Garbage Collection (GC). Bạn xử lý vấn đề GC Allocations thế nào?
* **Câu trả lời mẫu**:
  * **Nguyên nhân**: C# là ngôn ngữ Managed Code. Khi tạo ra các đối tượng Reference Type ngắn hạn (như `new List()`, `new Vector3()`, chuỗi `string`, Boxing/Unboxing), bộ nhớ Heap sẽ tích tụ và kích hoạt GC Collect ➔ Gây đứng hình (Lag Spike 50-200ms).
  * **Cách khắc phục**:
    1. **Tránh `new` trong Update**: Cấp phát tĩnh (Pre-allocate) bộ nhớ hoặc tái sử dụng mảng/list.
    2. **Object Pooling**: Pre-spawn danh sách GameObject trong `Awake()`, dùng `SetActive(true/false)` thay vì `Instantiate()` và `Destroy()`.
    3. **Tránh LINQ & Foreach trên phiên bản Unity cũ**: LINQ tạo ra nhiều Allocations ẩn. Dùng vòng lặp `for` truyền thống.
    4. **Dùng StringBuilder hoặc Interpolated String**: Tránh dùng `string + string` trong vòng lặp UI.
    5. **Dùng Struct (Value Type) thay cho Class** khi lưu dữ liệu nhỏ gọn không cần thừa kế.

---

### Q6: Trình bày cách bạn đọc và phân tích dữ liệu từ Unity Profiler để tìm BottleNeck?
* **Câu trả lời mẫu**:
  * **Các bước điều tra**:
    1. Mở **Unity Profiler** trên máy thật (Development Build nối USB/ADB, tránh test trên Editor vì kết quả không chính xác).
    2. Mở tab **CPU Usage**: Tìm xem phần tốn thời gian nhất rơi vào `Gfx.WaitForPresent` (bị nghẽn GPU), `Scripts` (nghẽn CPU), hay `GC.Collect` (nghẽn bộ nhớ).
    3. Mở tab **Memory Profiler**: Chụp Snapshot so sánh trước và sau khi chơi 5 màn để phát hiện Memory Leak (Tài nguyên unmanaged như Textures/Audio không được Unload).
    4. Mở tab **Rendering**: Kiểm tra tổng số Batches, SetPass Calls và Triangles/Verts.

---

<a id="phan-3"></a>
## PHẦN 3: VẬT LÝ, RENDER PIPELINE & GRAPHICS

### Q7: Phân biệt `Update()`, `FixedUpdate()`, và `LateUpdate()`. Khi nào xử lý vật lý bị giật (Jittering) và cách khắc phục?
* **Câu trả lời mẫu**:
  * **Update()**: Gọi mỗi frame hiển thị (phụ thuộc vào FPS màn hình). Dùng để nhận Input (Touch, Keyboard) và xử lý logic game thông thường.
  * **FixedUpdate()**: Gọi theo tần số cố định (mặc định 0.02s = 50Hz) độc lập với FPS. Dùng riêng cho tính toán vật lý (Rigidbody, Velocity, Force).
  * **LateUpdate()**: Gọi ngay sau khi tất cả `Update()` hoàn tất. Thường dùng để di chuyển Camera theo dõi nhân vật.
  * **Nguyên nhân Jittering (Giật hình vật lý)**: Di chuyển Rigidbody trong `Update()` thay vì `FixedUpdate()`, hoặc Camera di chuyển trong `Update()` trong khi nhân vật di chuyển bằng vật lý.
  * **Cách khắc phục**:
    * Mọi tác động lực `AddForce()` hoặc đổi `velocity` phải nằm trong `FixedUpdate()`.
    * Bật thuộc tính **Interpolate** trên Component `Rigidbody` để Unity tự động làm mượt vị trí giữa các bước tính vật lý.

---

### Q8: URP (Universal Render Pipeline) khác gì so với Built-in Render Pipeline? Ưu điểm khi làm Game Mobile?
* **Câu trả lời mẫu**:
  * **Built-in Pipeline**: Sử dụng Forward Rendering cũ, mỗi đèn (light) chiếu vào vật thể tạo ra thêm 1 pass render ➔ Số lượng đèn tăng làm Draw Calls tăng đột biến.
  * **URP**: Thiết kế tối ưu cho nhiều nền tảng (đặc biệt là Mobile). Sử dụng **Single-pass Forward Renderer** (hoặc Deferred) xử lý nhiều nguồn sáng trong 1 Pass duy nhất.
  * **Ưu điểm cho Mobile**:
    * Hỗ trợ **SRP Batcher** giảm thiểu chi phí CPU khi gửi dữ liệu Draw Call sang GPU.
    * Tích hợp **Shader Graph** và **VFX Graph** giúp Artist tạo hiệu ứng đẹp mà không cần viết HLSL/CG thủ công.
    * Quản lý Render Feature tùy biến linh hoạt (Post-processing nhẹ nhàng, Custom Depth Pass).

---

<a id="phan-4"></a>
## PHẦN 4: LẬP TRÌNH BẤT ĐỒNG BỘ & XỬ LÝ DỮ LIỆU

### Q9: So sánh `Coroutine` vs `UniTask` (hoặc `Task`). Vì sao UniTask được ưa chuộng trong Unity hiện đại?
* **Câu trả lời mẫu**:
  * **Coroutine**: 
    * Dựa trên C# `IEnumerator` và `yield return`.
    * Tạo ra Garbage Allocation mỗi khi `new WaitForSeconds()` hoặc `yield return null`.
    * Không trả về giá trị (Return Value), khó xử lý Try-Catch-Finally, không hỗ trợ async/await chuẩn.
  * **UniTask**:
    * Được tối ưu riêng cho Unity (ValueTask-based), **Zero Allocation** (không tạo rác bộ nhớ).
    * Hỗ trợ đầy đủ cú pháp `async / await`, có thể trả về giá trị (`UniTask<T>`).
    * Dễ dàng hủy tác vụ bằng `CancellationToken` (ví dụ khi GameObject bị Destroy).
    * Hỗ trợ gom nhóm tác vụ như `UniTask.WhenAll()` hoặc `UniTask.WhenAny()`.

---

### Q10: Làm thế nào để bảo mật dữ liệu lưu dưới Client (PlayerPrefs / Save File) tránh bị hack/mod?
* **Câu trả lời mẫu**:
  1. **Mã hóa Dữ liệu (Encryption)**: Không lưu Plain Text (JSON rõ ràng). Sử dụng thuật toán mã hóa **AES-256** hoặc **XOR** kết hợp với Device Unique ID làm Secret Key trước khi ghi xuống đĩa (`File.WriteAllBytes`).
  2. **Checksum / Hash Check**: Tạo mã băm SHA-256 đính kèm vào cuối file Save. Mỗi lần Load game, tính lại SHA-256 của nội dung, nếu không khớp với Hash lưu trữ ➔ Dữ liệu đã bị chỉnh sửa ➔ Reset hoặc cảnh báo.
  3. **Lưu Server-side**: Đối với các tài sản quan trọng (Tiền tệ, Gem, Item VIP), luôn xác thực và lưu trữ trên Server (SmartFoxServer/Firebase) thay vì hoàn toàn phụ thuộc vào Client Save.

---

<a id="phan-5"></a>
## PHẦN 5: SDK, PUBLISHING & PRODUCT ANALYTICS

### Q11: Việc tích hợp các SDK quảng cáo (AdMob/AppLovin) hoặc Analytics có thể gây giật lag game. Bạn xử lý vấn đề này như thế nào?
* **Câu trả lời mẫu**:
  * **Nguyên nhân**: SDK thường gọi các hàm Native Code (Java/Objective-C) chạy trên Main UI Thread của Android/iOS, hoặc gọi Callbacks gây block Main Thread của Unity.
  * **Giải pháp**:
    1. **Preload Ads**: Khởi tạo và tải trước Quảng cáo (Banner, Interstitial, Rewarded) từ các màn hình chờ/Loading, tránh gọi `LoadAd()` đúng lúc người chơi đang trong trận đấu.
    2. **Dispatch Callback sang Main Thread an toàn**: Sử dụng `UniTask` hoặc MainThreadDispatcher để đưa các callback từ SDK về xử lý ở frame kế tiếp.
    3. **Thanh lọc SDK không cần thiết**: Tránh tích hợp quá nhiều SDK trùng lặp năng lực gây tăng dung lượng APK và xung đột Gradle dependencies.

---

### Q12: Bạn sử dụng dữ liệu Firebase Analytics / Firebase Remote Config để đưa ra quyết định cải thiện sản phẩm như thế nào?
* **Câu trả lời mẫu**:
  * **Remote Config & A/B Testing**:
    * Thiết lập các biến điều khiển từ xa (ví dụ: `level_difficulty`, `reward_coins_amount`, `interstitial_cooldown_time`).
    * Chạy **A/B Test**: Chia 50% người chơi mới vào Group A (xem quảng cáo sau 60s) và 50% vào Group B (xem quảng cáo sau 90s). Theo dõi sự thay đổi của **Retention D1/D7** và **eCPM/ARPPU** để chọn phương án tối ưu nhất.
  * **Funnel Analytics (Phễu chuyển đổi)**:
    * Gắn Event `tutorial_step_X` và `level_start_X` / `level_complete_X`.
    * Đọc biểu đồ phễu trên Firebase: Nếu phát hiện 40% người chơi bỏ game ở Level 3 ➔ Nhận diện ngay Level 3 quá khó hoặc bị bug ➔ Đưa ra điều chỉnh gameplay kịp thời.

---

<a id="phan-6"></a>
## PHẦN 6: QUẢN LÝ DỰ ÁN & KỸ NĂNG LEAD DEVELOPER

### Q13: Với vai trò Lead Developer & PM, bạn giải quyết xung đột ý kiến giữa đội ngũ Game Design (GD) và Đội kỹ thuật (Dev) như thế nào?
* **Câu trả lời mẫu**:
  * **Nguyên tắc**: Luôn lấy **Mục tiêu sản phẩm**, **Trải nghiệm người chơi (UX)** và **Tiến độ (Deadline)** làm thước đo chung, không cảm tính.
  * **Quy trình xử lý**:
    1. **Lắng nghe ý tưởng GD**: Đánh giá tính khả thi về mặt kỹ thuật (Feasibility) và thời gian triển khai (Estimate Time).
    2. **Đề xuất giải pháp thay thế (Trade-off)**: Nếu tính năng GD muốn làm tốn 3 tuần nhưng chỉ mang lại giá trị nhỏ, Lead Dev sẽ đề xuất giải pháp MVP (Minimum Viable Product) làm trong 3-5 ngày để test phản hồi người chơi trước.
    3. **Thử nghiệm Prototype nhanh (Rapid Prototyping)**: Dùng các shape cơ bản (Cubes/Spheres) lập trình cơ chế trong 1-2 tuần để GD & PO trực tiếp chơi thử. Nếu thấy hay mới đầu tư Art & Code hoàn chỉnh.

---

### Q14: Làm thế nào bạn quản lý Nợ kỹ thuật (Technical Debt) khi Studio đòi hỏi ra game nhanh (Rush Deadline)?
* **Câu trả lời mẫu**:
  * Chấp nhận **Technical Debt có kiểm soát**: Trong giai đoạn làm Prototype hoặc Hyper-Casual/Hybrid-Casual cần test CPI gấp, ưu tiên viết code nhanh để kiểm chứng ý tưởng thị trường.
  * **Kế hoạch Refactoring khi sản phẩm có tín hiệu tốt**:
    * Ngay khi chỉ số CPI & Retention D1 đạt benchmark và dự án được bật đèn xanh (Greenlight) phát triển đường dài, lên kế hoạch cho 1-2 Sprint riêng để **Refactor kiến trúc**, đóng gói các Custom Editor Tools và tối ưu hiệu năng.
  * **Tái sử dụng Core Modules**: Xây dựng bộ thư viện nội bộ (Internal Core SDK: UI Framework, Sound Manager, Firebase Wrapper, Save System) để các dự án sau chỉ cần gắn vào là chạy, không phải viết lại từ đầu.

---

## LỜI KHUYÊN KHI ĐI PHỎNG VẤN SENIOR / LEAD UNITY:
1. **Trả lời theo mô hình STAR**: (Situation - Task - Action - Result). Luôn đính kèm con số thực tế (Ví dụ: *"Tôi tối ưu Draw Calls từ 150 xuống 40 giúp game đạt 60 FPS trên máy RAM 2GB"*).
2. **Thể hiện tư duy Product-Mindset**: Không chỉ giỏi code, mà phải hiểu code đó mang lại giá trị gì cho người dùng và doanh thu của công ty.
3. **Thái độ hợp tác (Ownership & Leadership)**: Thể hiện tinh thần chủ động giải quyết vấn đề, sẵn sàng hỗ trợ Juniors và kết nối giữa các bộ phận Art - Game Design - PO.
