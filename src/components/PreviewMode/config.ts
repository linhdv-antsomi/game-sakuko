export const PREVIEW_WINDOW_VARS = {
  PREVIEW_MODE: "true",
  getAppSettings: () =>
    Promise.resolve({
      code: 200,
      message: "Get app settings success",
      data: {
        globals: {},
        games: {},
      },
    }),

  getPhone: () => "0123456789",

  getAccessToken: () => "",

  gamification: {
    getGames: () =>
      Promise.resolve({
        code: 200,
        message: "Get Games success",
        data: [
          {
            gameId: 2,
            name: "Catch Rewards",
            startAt: "2025-12-01T16:59:59.000Z",
            endAt: "2026-01-31T16:59:59.000Z",
            status: "active",
            metadata: {
              leaderboard: {
                limit: 5,
                periodType: "all_time",
              },
            },
          },
        ],
      }),

    getGameDetail: () =>
      Promise.resolve({
        code: 200,
        message: "Get Game Detail success",
        data: {
          gameId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          name: "Catch Rewards",
          startAt: "2025-12-24T00:00:00.000Z",
          endAt: "2026-01-11T16:59:59.999Z",
          status: "active",
          metadata: {},
        },
      }),

    getLeaderboard: () =>
      Promise.resolve({
        code: 200,
        message: "Get Leaderboard success",
        data: {
          period: "2025-W50",
          leaderboard: [
            {
              rank: 1,
              userId: "test_user_001",
              name: "Nguyễn Văn A",
              avatar: "https://i.pravatar.cc/150?u=1",
              score: 1500,
            },
            {
              rank: 2,
              userId: "test_user_002",
              name: "Trần Thị B",
              avatar: "https://i.pravatar.cc/150?u=2",
              score: 1350,
            },
            {
              rank: 3,
              userId: "test_user_003",
              name: "Lê Văn C",
              avatar: "https://i.pravatar.cc/150?u=3",
              score: 1200,
            },
            {
              rank: 4,
              userId: "test_user_004",
              name: "Phạm Thị D",
              avatar: "https://i.pravatar.cc/150?u=4",
              score: 1100,
            },
            {
              rank: 5,
              userId: "test_user_005",
              name: "Hoàng Văn E",
              avatar: "https://i.pravatar.cc/150?u=5",
              score: 950,
            },
          ],
          userRank: {
            userId: "5437354148445052520",
            rank: 11,
            name: "Dat Le",
            avatar: "https://i.pravatar.cc/150?u=10",
            score: 150,
          },
        },
      }),

    getUserStats: () =>
      Promise.resolve({
        code: 200,
        message: "Get User Stats success",
        data: {
          userId: "3501617736397730483",
          gameId: 1,
          remainingTurns: 1,
          totalScore: 0,
        },
      }),

    getCanPlay: () =>
      Promise.resolve({
        code: 200,
        message: "Can Play success",
        data: {
          canPlay: true,
          remainingTurns: 1,
        },
      }),

    getCanShare: () =>
      Promise.resolve({
        code: 200,
        message: "Can Share success",
        data: {
          canShare: false,
          remainingShares: null,
        },
      }),

    shareGame: () =>
      Promise.resolve({
        code: 200,
        message: "Share Game success",
        data: {
          success: true,
          turnsGranted: 1,
          turnsRemaining: 1,
          message: "Share successful",
        },
      }),

    playGame: () =>
      Promise.resolve({
        code: 200,
        message: "Play Game success",
        data: {
          success: true,
          reward: {
            type: "voucher",
            metadata: {
              promotion_code: "GAMEZMA45307047",
              scheme_id: "Evoucher 10% áp dụng cho mọi hóa đơn nguyên giá",
              name: "Evoucher 10% áp dụng cho mọi hóa đơn nguyên giá",
              description:
                "<p>     Thời gian chơi game: 15.12 .2025 - 11.01.2026<br>     Hạn sử dụng Voucher: hết 20.01.2026 </p> <p>     Điều kiện sử dụng:<br>     - Không áp dụng đồng thời với các chương trình khuyến mãi khác<br>     - Voucher quà tặng không được quy đổi ra tiền mặt hay trả lại tiền thừa nếu giá trị voucher lớn hơn giá trị đơn hàng<br>     - Không cộng gộp nhiều voucher trên 1 hóa đơn<br>     - Không áp dụng khi mua thẻ Giftcard<br>     - Mỗi voucher chỉ được sử dụng 01 lần<br>     - Địa chỉ áp dụng: Hệ thống SR Sakuko trên toàn quốc </p>",
              icon: "https://st-media-template.antsomi.com/upload/2024/11/23/d022c449-964a-4f9f-ab5d-2ff9bdd71bb9.png",
              result_description: " Áp dụng cho mọi hóa đơn nguyên giá",
              type: "voucher",
              expire_type: "fixed",
              expire_value: "2026-01-20 23:59:59",
              globalTracking: {
                view: "https://ap2-a.cdp.asia/stream_event?portal_id=564891226&prop_id=564998050&uid=5437354148445052520&aid=5437354148445052520&cid=&ea=viewable&en=viewable_advertising&ec=advertising&items=%5B%5D&dims=%7B%22campaign%22%3A%7B%22id%22%3A%2245227044%22%7D%2C%22story%22%3A%7B%22id%22%3A%2245227043%22%7D%2C%22variant%22%3A%7B%22id%22%3A%2245227045%22%7D%2C%22ad_zone%22%3A%7B%7D%2C%22destination%22%3A%7B%22id%22%3A%2215335258%22%7D%2C%22channel%22%3A%7B%22id%22%3A%222%22%7D%7D&is_debug=1&extra=%7B%22target_segment_ids%22%3A%5B%5D%7D&delivery_src=antsomi&is_server=false&request_id=7cce77ad-a53f-4dfe-aed1-faa01c293fda&resp_type=json",
                impression:
                  "https://ap2-a.cdp.asia/stream_event?portal_id=564891226&prop_id=564998050&uid=5437354148445052520&aid=5437354148445052520&cid=&ea=impression&en=impression_advertising&ec=advertising&items=%5B%5D&dims=%7B%22campaign%22%3A%7B%22id%22%3A%2245227044%22%7D%2C%22story%22%3A%7B%22id%22%3A%2245227043%22%7D%2C%22variant%22%3A%7B%22id%22%3A%2245227045%22%7D%2C%22ad_zone%22%3A%7B%7D%2C%22destination%22%3A%7B%22id%22%3A%2215335258%22%7D%2C%22channel%22%3A%7B%22id%22%3A%222%22%7D%7D&is_debug=1&extra=%7B%22target_segment_ids%22%3A%5B%5D%7D&delivery_src=antsomi&is_server=false&request_id=ca76d6a9-a3c3-40b3-b61b-d85ef52eb26b&resp_type=json",
                atmTrackingParameters: "",
              },
              voucherId: 461670,
            },
          },
          remainingTurns: 0,
        },
      }),

    checkin: () =>
      Promise.resolve({
        code: 200,
        message: "Checkin success",
        data: {
          success: false,
          grantedTurns: 0,
          remainingTurns: 2,
          message: "Already checked in today",
        },
      }),
  },

  login: () =>
    Promise.resolve({
      code: 200,
      message: "Login success",
      data: {
        accessToken: "",
        user: {
          zaloUid: "",
          phone: "",
        },
      },
    }),
};
