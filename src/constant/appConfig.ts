import {PRIVACY_POLICY} from "./privacyPolicy";
import {PROGRAM_RULES} from "./programeRules";

export const APP_CONFIG = {
  OA_ID: import.meta.env.VITE_OA_ID,
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
  GOOGLE_MAP_API_KEY: import.meta.env.GOOGLE_MAP_API_KEY,
  API_ZMA_URL: `${import.meta.env.VITE_API_DOMAIN}/api`,
  SANDBOX_API_ZMA_URL: `https://sandbox-api-zma.antsomi.com/api`,
  SANDBOX_SOCKET_URL: `wss://sandbox-ws.ants.tech/zma`,
  PRODUCTION_API_ZMA_URL: `https://api.ants.tech/access/api`,
  CLIENT_PREFIX: '/zma/aristino',
  DEV_ACCESS_TOKEN: import.meta.env.VITE_DEV_ACCESS_TOKEN,
  SOCKET_URL: `${import.meta.env.VITE_SOCKET_URL}`,
  FACEBOOK_PIXEL_ID: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  PORTAL_ID: 564891226,
  APP_FONT: "SVN-Gilroy",
  VOUCHER_DETAIL_BAR_WIDTH: 2,
  VOUCHER_GIFT_BAR_WIDTH: 2,
  SYSTEM_ERROR_MESSAGES: {
    cardFlipEnd: `Chương trình “LẬT THẺ BÀI ĐAN LÁT – 100% NHẬN QUÀ TẶNG” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác trong tương lai nhé!`,
    merryChristmasEnd: `Chương trình “VUI GIÁNG SINH – RINH QUÀ TẶNG” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác trong tương lai nhé!`,
    requestPermission: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với chúng mình nhé. <br /> <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký tham gia trò chơi và gửi bạn các thông tin về quà tặng của chương trình.`,
    phoneNumberNotSupported: `Rất tiếc, ứng dụng hiện chỉ hỗ trợ các số điện thoại thuộc Việt Nam. Hãy dùng số Việt Nam để tiếp tục nhé!`,
    osNotSupported:
      "Xin lỗi ứng dụng không tương thích với thiết bị của bạn. Vui lòng nâng cấp hệ điều hành để tiếp tục trải nghiệm. <br /> Ứng dụng tương thích tốt nhất với Hệ điều hành iOS từ phiên bản 15 trở lên, và Android từ phiên bản 8 trở lên.",
    regionNotSupported:
      "Xin lỗi, ứng dụng hiện chỉ hỗ trợ trong lãnh thổ Việt Nam. Hãy quay lại khi bạn đang ở Việt Nam để trải nghiệm các tính năng hấp dẫn từ chúng tôi!",
    networkError:
      "Xin lỗi quá trình tải ứng dụng bị gián đoạn. Vui lòng kiểm tra kết nối đường truyền mạng và tải lại ứng dụng.",
    luckyMoneyEnd:
      "Chương trình “Aristino Rewards” đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác từ Aristino trong tương lai nhé!",
    underConstruction:
      "Miniapp đang trong quá trình xây dựng, hẹn gặp bạn sau nhé!",
    maintenance:
      "Xin lỗi vì sự bất tiện này, hệ thống đang trong giai đoạn bảo trì. Chúng tôi sẽ sớm trở lại",
    limitRequest:
      "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng khởi động lại ứng dụng và thử lại nhé!",
    gameEnd:
      "Chương trình đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác từ Aristino trong tương lai nhé!",
    gameNotReady:
      "Chương trình sắp bắt đầu rồi đó! Cùng chờ đón những điều thú vị từ Aristino nhé!",
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
    AFFILIATE: {
      START_DATE: "2025-05-01 00:00:00",
      END_DATE: "2025-12-01 23:59:59",
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với
          chúng mình nhé. <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký tham gia trò
          chơi game và gửi bạn các thông tin về quà
          tặng của chương trình.`,
      MAX_PLAY_TIMES: 3,
    },
    MIX_AND_MATCH: {
      START_DATE: "2025-05-01 00:00:00",
      END_DATE: "2025-08-01 23:59:59",
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với chúng mình nhé. <br /> <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký trở thành thành viên và tham gia trò chơi "Vị Hè Trong Tay" của bạn`,
      GAME_END_MSG: `Chương trình "Chill Hè" đã kết thúc. Hẹn bạn ở các hoạt động thú vị khác từ Aristino trong tương lai nhé!`,
      BONUS_PLAYS: 5,
    },
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
    CARD_FLIP: {
      START_DATE: "2025-10-25 00:00:00",
      END_DATE: "2025-11-24 23:59:59",
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với
          chúng mình nhé. <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký tham gia trò
          chơi game và gửi bạn các thông tin về quà
          tặng của chương trình.`,
      SHARE_TITLE: 'Lật thẻ bài đan lát – 100% nhận quà tặng',
      SHARE_DESCRIPTION: 'Ra mắt Aristino Rewards – mỗi lần lật thẻ là một món quà tri ân. Tham gia ngay minigame để khám phá phần quà huyền thoại và trải nghiệm bộ sưu tập mới nhất từ Aristino.',
      SHARE_THUMBNAIL: 'https://st-media-template.antsomi.com/upload/2025/10/27/1d1b5c42-90f9-4695-b993-4249f4f5ee55.jpg',
      SHARE_PATH: 'games/card-flip',
      TERM_AND_CONDITION_TITLE: 'LẬT THẺ BÀI ĐAN LÁT – 100% NHẬN QUÀ TẶNG',
      TERM_AND_CONDITION: `<style>
 p {
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
 }

 li {
  margin: 4px 0px;
 }
</style>
<p>
 <strong>Tên chương trình: Lật thẻ bài đan lát – 100% nhận quà tặng</strong>
</p>
<p>
 <strong>Thời gian: </strong>
 <span>01.11.2025 – 24.11.2025</span>
</p>
<p>
 <strong>Phạm vi áp dụng: </strong>
 <span>toàn hệ thống Showroom Aristino</span>
</p>
<p>
 <strong>Đối tượng: </strong> 
 <span>toàn bộ khách hàng tham gia chơi minigame đều được tặng quà</span>
</p>
<p>
 <strong>Điều kiện, cách thức cụ thể khách hàng tham gia: </strong>
 <span>Tất cả khách hàng tham gia Minigame sẽ nhận được 01 lần lật thẻ bài quà tặng tương ứng theo quy định. Với mỗi lượt Khách hàng được lật 01 thẻ bài quà tặng, khách hàng chọn ngẫu nhiên 01 thẻ bài trong 06 thẻ bài để nhận được quà tặng tương ứng với thẻ bài đó.</span>
</p>
<p>Nếu khách hàng chia sẻ game cho bạn bè, người thân thì sẽ được nhận thêm 01 lượt chơi / ngày.</p>
<p>
 <strong>Quy định về quà tặng Voucher:</strong>
</p>
<p>Hạn sử dụng: 30/11/2025</p>
<p>
 <strong>Điều kiện sử dụng:</strong>
</p>
<p>
<ul>
 <li>
  <strong>Không áp dụng đồng thời </strong>
  <span>với các chương trình khuyến mãi khác.</span>
 </li>
 <li>
  <strong>Voucher quà tặng không được quy đổi ra tiền mặt </strong>
  <span>hay trả lại tiền thừa nếu giá trị voucher lớn hơn giá trị đơn hàng.</span>
 </li>
 <li>
  <strong>Không cộng gộp nhiều voucher </strong>
  <span>trên </span>
  <strong>01 hóa đơn.</strong>
 </li>
 <li>
  <strong>Không áp dụng </strong>
  <span>khi mua </span>
  <strong>thẻ Giftcard.</strong>
 </li>
 <li>
  <strong>Mỗi voucher </strong>
  <span>chỉ được sử dụng </span>
  <strong>01 lần.</strong>
 </li>
 <li>
  <strong>Địa chỉ áp dụng: </strong>
  <span>Hệ thống cửa hàng bán lẻ (SR) </span>
  <strong>Aristino trên toàn quốc.</strong>
 </li>
</ul>
</p>`,
      TIME_OPEN_GIFT: 800,
      TIME_SHOW_GIFT: 500,
      NO_TURN_LEFT_ERROR: "Rất tiếc, bạn đã hết lượt chơi! <br /> Cảm ơn bạn đã tham gia! Hãy đón chờ các chương trình tiếp theo để có thêm cơ hội tham gia nhé!",
    },
    MERRY_CHRISTMAS: {
      START_DATE: "2025-12-03 00:00:00",
      END_DATE: "2025-12-30 23:59:59",
      TIME_DELAY_SHOW_GIFT: 1000,
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với
          chúng mình nhé. <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký tham gia trò
          chơi game và gửi bạn các thông tin về quà
          tặng của chương trình.`,
      SHARE_TITLE: 'VUI GIÁNG SINH – RINH QUÀ TẶNG',
      SHARE_DESCRIPTION: 'Tham gia ngay minigame để khám phá phần quà huyền thoại và trải nghiệm bộ sưu tập mới nhất từ Aristino.',
      SHARE_THUMBNAIL: 'https://st-media-template.antsomi.com/upload/2025/10/27/1d1b5c42-90f9-4695-b993-4249f4f5ee55.jpg',
      SHARE_PATH: 'games/merry-christmas',
      NO_TURN_LEFT_ERROR: "Rất tiếc, bạn đã hết lượt chơi! <br /> Cảm ơn bạn đã tham gia! Hãy đón chờ các chương trình tiếp theo để có thêm cơ hội tham gia nhé!",
      TERM_AND_CONDITION_TITLE: 'Săn Phong Cách - Rinh Quà Thời Thượng',
      TERM_AND_CONDITION: `<style> p { margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px; } li { margin: 4px 0px; }</style><p><strong>Tên chương trình: Vui giáng sinh – rinh quà tặng</strong></p><p><strong>Thời gian: </strong><span>15.12.2025 – 11.01.2026</span></p><p><strong>Phạm vi áp dụng: </strong><span>toàn hệ thống Showroom Aristino</span></p><p><strong>Đối tượng: </strong><span>toàn bộ khách hàng tham gia chơi minigame đều được tặng quà</span></p><p><strong>Điều kiện, cách thức cụ thể khách hàng tham gia: </strong><span>Tất cả khách hàng tham gia Minigame sẽ nhận được 01 lần hứng quà tặng, mỗi quà tặng hứng được tương ứng với số điểm nhận được thể hiện trong game. Với mỗi lượt, Quý khách được hứng trong vòng 45s, nếu hứng được đồng hồ thì được cộng thêm 2s vào lượt chơi. Tương ứng với mỗi số điểm Quý khách hứng được, Quý khách sẽ nhận được phần quà từ chương trình.</span></p><p>Mỗi ngày Quý khách sẽ được cộng thêm 1 lượt chơi.</p><p>Nếu khách hàng chia sẻ game cho bạn bè, người thân thì sẽ được nhận thêm 01 lượt chơi trong ngày hôm đó.</p><p>Mỗi khách hàng mua hàng được cộng thêm 2 lượt chơi.</p><p>Trong khoảng thời gian 1 tuần, nếu Quý khách chơi được điểm cao Top 3 sẽ được nhận thêm quà tặng combo sịp tất trị giá 300K.</p><p><strong>Quy định về quà tặng Voucher:</strong></p><p>Hạn sử dụng: 20/01/2026</p><p><strong>Điều kiện sử dụng:</strong></p><p><ul><li><strong>Không áp dụng đồng thời </strong><span>với các chương trình khuyến mãi khác.</span></li><li><strong>Voucher quà tặng không được quy đổi ra tiền mặt </strong><span>hay trả lại tiền thừa nếu giá trị voucher lớn hơn giá trị đơn hàng.</span></li><li><strong>Không cộng gộp nhiều voucher </strong><span>trên </span><strong>01 hóa đơn.</strong></li><li><strong>Không áp dụng </strong><span>khi mua </span><strong>thẻ Giftcard.</strong></li><li><strong>Mỗi voucher </strong><span>chỉ được sử dụng </span><strong>01 lần.</strong></li><li><strong>Địa chỉ áp dụng: </strong><span>Hệ thống cửa hàng bán lẻ (SR) </span><strong>Aristino trên toàn quốc.</strong></li></ul></p>`,
    },
    CATCH_REWARDS: {
      START_DATE: "2025-12-03 00:00:00",
      END_DATE: "2025-12-30 23:59:59",
      TIME_DELAY_SHOW_GIFT: 1000,
      REQUEST_PERMISSION_MSG: `Bạn ơi, đồng ý Follow OA Aristino và chia sẻ số điện thoại với
          chúng mình nhé. <br /> Đây là điều kiện cần để Aristino xác nhận việc đăng ký tham gia trò
          chơi game và gửi bạn các thông tin về quà
          tặng của chương trình.`,
      SHARE_TITLE: 'VUI GIÁNG SINH – RINH QUÀ TẶNG',
      SHARE_DESCRIPTION: 'Tham gia ngay minigame để khám phá phần quà huyền thoại và trải nghiệm bộ sưu tập mới nhất từ Aristino.',
      SHARE_THUMBNAIL: 'https://st-media-template.antsomi.com/upload/2025/10/27/1d1b5c42-90f9-4695-b993-4249f4f5ee55.jpg',
      SHARE_PATH: 'games/catch-rewards',
      NO_TURN_LEFT_ERROR: "Rất tiếc, bạn đã hết lượt chơi! <br /> Cảm ơn bạn đã tham gia! Hãy đón chờ các chương trình tiếp theo để có thêm cơ hội tham gia nhé!",
      TERM_AND_CONDITION_TITLE: 'Săn Phong Cách - Rinh Quà Thời Thượng',
      TERM_AND_CONDITION: `<style> p { margin-block-start: 1em; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px; } li { margin: 4px 0px; }</style><p><strong>Tên chương trình: Vui giáng sinh – rinh quà tặng</strong></p><p><strong>Thời gian: </strong><span>15.12.2025 – 11.01.2026</span></p><p><strong>Phạm vi áp dụng: </strong><span>toàn hệ thống Showroom Aristino</span></p><p><strong>Đối tượng: </strong><span>toàn bộ khách hàng tham gia chơi minigame đều được tặng quà</span></p><p><strong>Điều kiện, cách thức cụ thể khách hàng tham gia: </strong><span>Tất cả khách hàng tham gia Minigame sẽ nhận được 01 lần hứng quà tặng, mỗi quà tặng hứng được tương ứng với số điểm nhận được thể hiện trong game. Với mỗi lượt, Quý khách được hứng trong vòng 45s, nếu hứng được đồng hồ thì được cộng thêm 2s vào lượt chơi. Tương ứng với mỗi số điểm Quý khách hứng được, Quý khách sẽ nhận được phần quà từ chương trình.</span></p><p>Mỗi ngày Quý khách sẽ được cộng thêm 1 lượt chơi.</p><p>Nếu khách hàng chia sẻ game cho bạn bè, người thân thì sẽ được nhận thêm 01 lượt chơi trong ngày hôm đó.</p><p>Mỗi khách hàng mua hàng được cộng thêm 2 lượt chơi.</p><p>Trong khoảng thời gian 1 tuần, nếu Quý khách chơi được điểm cao Top 3 sẽ được nhận thêm quà tặng combo sịp tất trị giá 300K.</p><p><strong>Quy định về quà tặng Voucher:</strong></p><p>Hạn sử dụng: 20/01/2026</p><p><strong>Điều kiện sử dụng:</strong></p><p><ul><li><strong>Không áp dụng đồng thời </strong><span>với các chương trình khuyến mãi khác.</span></li><li><strong>Voucher quà tặng không được quy đổi ra tiền mặt </strong><span>hay trả lại tiền thừa nếu giá trị voucher lớn hơn giá trị đơn hàng.</span></li><li><strong>Không cộng gộp nhiều voucher </strong><span>trên </span><strong>01 hóa đơn.</strong></li><li><strong>Không áp dụng </strong><span>khi mua </span><strong>thẻ Giftcard.</strong></li><li><strong>Mỗi voucher </strong><span>chỉ được sử dụng </span><strong>01 lần.</strong></li><li><strong>Địa chỉ áp dụng: </strong><span>Hệ thống cửa hàng bán lẻ (SR) </span><strong>Aristino trên toàn quốc.</strong></li></ul></p>`,
    }
  },
};
