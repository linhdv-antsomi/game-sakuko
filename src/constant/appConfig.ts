import {PRIVACY_POLICY} from "./privacyPolicy";
import {PROGRAM_RULES} from "./programeRules";

export const APP_CONFIG = {
  GAME_ID: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  OA_ID: import.meta.env.VITE_OA_ID,
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
  GOOGLE_MAP_API_KEY: import.meta.env.GOOGLE_MAP_API_KEY,
  API_ZMA_URL: `${import.meta.env.VITE_API_DOMAIN}/api`,
  SANDBOX_API_ZMA_URL: `https://sandbox-api-zma.antsomi.com/api`,
  SANDBOX_SOCKET_URL: `wss://sandbox-ws.ants.tech/zma`,
  PRODUCTION_API_ZMA_URL: `https://api.ants.tech/access/api`,
  CLIENT_PREFIX: '/zma/sakuko',
  DEV_ACCESS_TOKEN: import.meta.env.VITE_DEV_ACCESS_TOKEN,
  SOCKET_URL: `${import.meta.env.VITE_SOCKET_URL}`,
  FACEBOOK_PIXEL_ID: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  PORTAL_ID: 564891226,
  APP_FONT: "SVN-Gilroy",
  VOUCHER_DETAIL_BAR_WIDTH: 2,
  VOUCHER_GIFT_BAR_WIDTH: 2,
  SYSTEM_ERROR_MESSAGES: {
    catchRewardsEnd: `Chương trình “Hứng Quà Nhật - Rinh Deal Chất” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác trong tương lai nhé!`,
    cardFlipEnd: `Chương trình “LẬT THẺ BÀI ĐAN LÁT – 100% NHẬN QUÀ TẶNG” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác trong tương lai nhé!`,
    merryChristmasEnd: `Chương trình “VUI GIÁNG SINH – RINH QUÀ TẶNG” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác trong tương lai nhé!`,
    requestPermission: `Bạn ơi, đồng ý Follow OA Sakuko và chia sẻ số điện thoại với chúng mình nhé. <br /> <br /> Đây là điều kiện cần để Sakuko xác nhận việc đăng ký tham gia trò chơi và gửi bạn các thông tin về quà tặng của chương trình.`,
    phoneNumberNotSupported: `Rất tiếc, ứng dụng hiện chỉ hỗ trợ các số điện thoại thuộc Việt Nam. Hãy dùng số Việt Nam để tiếp tục nhé!`,
    osNotSupported:
      "Xin lỗi ứng dụng không tương thích với thiết bị của bạn. Vui lòng nâng cấp hệ điều hành để tiếp tục trải nghiệm. <br /> Ứng dụng tương thích tốt nhất với Hệ điều hành iOS từ phiên bản 15 trở lên, và Android từ phiên bản 8 trở lên.",
    regionNotSupported:
      "Xin lỗi, ứng dụng hiện chỉ hỗ trợ trong lãnh thổ Việt Nam. Hãy quay lại khi bạn đang ở Việt Nam để trải nghiệm các tính năng hấp dẫn từ chúng tôi!",
    networkError:
      "Xin lỗi quá trình tải ứng dụng bị gián đoạn. Vui lòng kiểm tra kết nối đường truyền mạng và tải lại ứng dụng.",
    luckyMoneyEnd:
      "Chương trình Sakuko Rewards” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác từ Sakuko trong tương lai nhé!",
    underConstruction:
      "Miniapp đang trong quá trình xây dựng, hẹn gặp bạn sau nhé!",
    maintenance:
      "Xin lỗi vì sự bất tiện này, hệ thống đang trong giai đoạn bảo trì. Chúng tôi sẽ sớm trở lại",
    limitRequest:
      "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng khởi động lại ứng dụng và thử lại nhé!",
    gameEnd:
      "Chương trình đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác từ Sakuko trong tương lai nhé!",
    gameNotReady:
      "Chương trình sắp bắt đầu rồi đó! Cùng chờ đón những điều thú vị từ Sakuko nhé!",
    outOfCode: `Xin lỗi, số lượng voucher hiện tại đã hết. <br /> Hãy quay lại sau để nhận quà nhé!`,
    bannedUser:
      "Tài khoản của bạn đã bị tạm khóa do vi phạm chính sách sử dụng. Vui lòng liên hệ bộ phận hỗ trợ để biết thêm chi tiết. Hotline: 19001755.",
    requestAcceptTerms: 'Bạn vui lòng tích vào nút đồng ý với điều khoản để chơi ngay.',
  },
  PROGRAM_RULES: PROGRAM_RULES,
  PRIVACY_POLICY: PRIVACY_POLICY,
  INFO_DELIVERY:``,
  HISTORY_ORDER:``,
  TEST_PHONE: "0938399289",
  GAMES: {
    STAMP_COLLECTOR: {
      START_DATE: "2025-04-01 00:00:00",
      END_DATE: "2025-10-31 23:59:59",
      PUSH_MESSAGES: [
        {
          message: "Không thể <br /> &nbsp;&nbsp; bỏ ngang!",
          collectedStamps: [1, 2],
        },
        {
          message: "Nhận voucher <br /> 10K",
          collectedStamps: [3],
        },
        {
          message: "Cố thêm <br /> &nbsp;&nbsp; chút nữa",
          collectedStamps: [4, 5],
        },
        {
          message: "Nhận Bánh <br /> &nbsp;&nbsp; Mì Que",
          collectedStamps: [6],
        },
        {
          message: "Sắp nhận <br /> &nbsp;&nbsp; Trà ngonnn",
          collectedStamps: [7, 8],
        },
      ],
    },
    CATCH_REWARDS: {
      START_DATE: "2025-12-03 00:00:00",
      END_DATE: "2025-12-30 23:59:59",
      TIME_DELAY_SHOW_GIFT: 1000,
      MIN_SCORE_TO_CLAIM_REWARD: 300,
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Sakuko và chia sẻ số điện thoại với
          chúng mình nhé. <br /> Đây là điều kiện cần để Sakuko xác nhận việc đăng ký tham gia trò
          chơi game và gửi bạn các thông tin về quà
          tặng của chương trình.`,
      SHARE_TITLE: 'CHƠI GAME CÓ THƯỞNG: HỨNG QUÀ NHẬT - RINH DEAL CHẤT',
      SHARE_DESCRIPTION: 'Tỉ lệ trúng quà lên đến 100%, chơi ngay để tận hưởng hàng ngàn giải thưởng giá trị dành cho bạn!',
      SHARE_THUMBNAIL: 'https://st-media-template.antsomi.com/upload/2025/12/24/8311f593-307d-4530-a30f-3bc1254796e7.png',
      SHARE_PATH: 'games/catch-rewards',
      NO_TURN_LEFT_ERROR: "Rất tiếc, bạn đã hết lượt chơi! <br /> Cảm ơn bạn đã tham gia! Hãy đón chờ các chương trình tiếp theo để có thêm cơ hội tham gia nhé!",
      TERM_AND_CONDITION_TITLE: 'THỂ LỆ CHƯƠNG TRÌNH: "HỨNG QUÀ NHẬT- RINH DEAL CHẤT"',
      TERM_AND_CONDITION: `<style>p{margin-block-start:1em;margin-block-end:1em;margin-inline-start:0;margin-inline-end:0}li{margin:4px 0}.table{width:100%;border-collapse:collapse;font-size:14px}.table td{padding:8px 12px;border-bottom:1px solid #e5e7eb;border-right:1px solid #e5e7eb;vertical-align:top}.table td:last-child,.table th:last-child{border-right:none}</style><p><strong>1. Tên chương trình:&nbsp;</strong>“Hứng Quà Nhật Rinh Deal Chất”</p><p><strong>2. Thời gian và Phạm vi áp dụng:</strong><ul><li><strong>Thời gian diễn ra:&nbsp;</strong>Từ 00:00 ngày 01/01/2026 đến 23:59 ngày 31/01/2026</li><li><strong>Phạm vi:&nbsp;</strong>Hệ thống Sakuko Store tại Hà Nội (Trừ Sakuko Gamuda và Đông Anh)</li></ul></p><p><strong>3. Đối tượng tham gia:</strong><ul><li>Tất cả khách hàng đã có tài khoản thành viên hoặc đăng ký mới trên Zalo Mini App Sakuko Rewards (sau đây gọi tắt là ZMA)</li></ul></p><p><strong>4. Cách thức tham gia trò chơi:</strong><ul><li><strong>Bước 1:&nbsp;</strong>Khách hàng truy cập ZMA Sakuko Rewards hoặc quét mã QR chương trình, chọn banner game "Hứng Quà Sakuko"</li><li><strong>Bước 2:&nbsp;</strong>Nhấn nút "Tham gia" và đọc kỹ hướng dẫn trước khi nhấn "Bắt đầu ngay"</li><li><strong>Bước 3:&nbsp;</strong>Người chơi điều khiển "Giỏ Hàng Sakuko" di chuyển sang Trái hoặc Phải để hứng các vật phẩm may mắn rơi xuống và tránh các chướng ngại vật</li><li><strong>Thời gian mỗi lượt chơi:&nbsp;</strong>15 giây (đếm ngược). Nếu hứng được vật phẩm "Đồng hồ", người chơi được cộng thêm 05 giây (tối đa 2 lần/lượt)</li></ul></p><p><strong>5. Quy định về lượt chơi:</strong><ul><li><strong>Điểm danh hàng ngày&nbsp;</strong>(Đăng nhập vào trò chơi nhận thêm&nbsp;<strong>+1 lượt</strong>)</li><li><strong>Chia sẻ chương trình:</strong>Chia sẻ game lên Zalo (Tin nhắn nhóm, Tin nhắn cá nhân, Nhật ký) ở chế độ công khai nhận thêm&nbsp;<strong>+1 lượt/ngày</strong>&nbsp;(Giới hạn: Tối đa 1 lượt/ngày).</li><li><strong>Mua sắm:</strong>Phát sinh đơn hàng thành công từ 200.000đ trở lên nhận thêm&nbsp;<strong>+3 lượt</strong>&nbsp;(Giới hạn: Tối đa 3 lượt/ngày).</li></ul></p><p><strong>6. Cơ cấu giải thưởng và Điều kiện nhận giải:</strong></p><p><strong>6.1. Giải thưởng Quà nhận ngay:</strong><p>Dựa trên tổng điểm số đạt được trong một phiên chơi (sau khi trừ điểm phạt từ chướng ngại vật), khách hàng sẽ nhận được quà tặng tương ứng:</p></p><table class="table"><tr><td><strong>Mốc điểm đạt được</strong></td><td><strong>Quà tặng</strong></td><td><strong>Điều kiện áp dụng Voucher</strong></td></tr><tr><td><strong>Từ 300 điểm</strong></td><td>Voucher giảm&nbsp;<strong>20.000đ</strong></td><td>Áp dụng cho đơn hàng từ&nbsp;<strong>499.000đ</strong></td></tr><tr><td><strong>Từ 500 điểm</strong></td><td>Voucher giảm&nbsp;<strong>50.000đ</strong></td><td>Áp dụng cho đơn hàng từ&nbsp;<strong>799.000đ</strong></td></tr><tr><td><strong>Từ 1.000 điểm</strong></td><td>Voucher giảm&nbsp;<strong>15%</strong></td><td>Giảm tối đa&nbsp;<strong>100.000đ</strong>. Áp dụng cho mọi đơn hàng.</td></tr></table><p>Lưu ý: Voucher sẽ được gửi thẳng vào mục "Ví Voucher" trên ZMA Sakuko Rewards ngay sau khi kết thúc lượt chơi.</p><p><strong>6.2. Quy định sử dụng Voucher:</strong><ul><li>Voucher không có giá trị quy đổi thành tiền mặt.</li><li>Không hoàn lại tiền thừa nếu giá trị Voucher lớn hơn giá trị đơn hàng.</li><li>Mỗi đơn hàng chỉ được áp dụng 01 Voucher.</li></ul></p><p><strong>7. Giải Đua Top Bảng Xếp Hạng:</strong></p><p>Chương trình đua Top sẽ được triển khai theo các đợt chiến dịch riêng biệt. Danh sách khách hàng trúng thưởng giải hiện vật (nếu có) sẽ được công bố công khai trên Fanpage Sakuko Store. Ban Tổ Chức (BTC) sẽ liên hệ trao giải trong vòng 7-15 ngày làm việc.</p><p><strong>8. Các quy định chung và Chế tài xử lý vi phạm:</strong><ul><li><strong>Tính trung thực:&nbsp;</strong>Nghiêm cấm mọi hành vi gian lận, sử dụng phần mềm thứ 3, trình giả lập hoặc can thiệp vào hệ thống để thay đổi kết quả trò chơi.</li><li><strong>Chế tài xử lý:&nbsp;</strong>Nếu phát hiện gian lận, BTC có quyền&nbsp;<strong>hủy bỏ toàn bộ kết quả</strong>&nbsp;thi đua và&nbsp;<strong>khóa tài khoản vĩnh viễn</strong>&nbsp;mà không cần báo trước.</li><li><strong>Quyền sử dụng hình ảnh:&nbsp;</strong>Bằng việc tham gia chương trình, khách hàng đồng ý cho phép Sakuko Store sử dụng tên và hình ảnh của người trúng giải cho các mục đích truyền thông, quảng bá thương mại mà không phải trả thêm bất kỳ khoản chi phí nào.</li><li><strong>Giải quyết tranh chấp:&nbsp;</strong>Trong mọi trường hợp xảy ra khiếu nại hay tranh chấp liên quan đến chương trình, quyết định của Sakuko Store là quyết định cuối cùng.</li></ul></p>`,
    }
  },
};
