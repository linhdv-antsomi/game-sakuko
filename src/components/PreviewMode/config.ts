export const PREVIEW_WINDOW_VARS = {
  PREVIEW_MODE: "true",
  getAppSettings: () =>
    Promise.resolve({
      code: 200,
      message: "Get app settings success",
      data: {
        globals: {},
        games: {
          catchRewards: {
            eventStartDate: "2025-01-01 00:00:00",
            eventEndDate: "2030-01-01 00:00:00",
          },
        },
      },
    }),

  checkCanAllocateVoucher: () =>
    Promise.resolve({
      code: 200,
      message: "Check can allocate voucher success",
      data: {
        canAllocate: true,
        remainPlays: 15,
      },
    }),

  checkCanShareGame: () =>
    Promise.resolve({
      code: 200,
      message: "Check can share game success",
      data: {
        canShare: true,
        remainingShares: 15,
        dailyShareCount: 15,
      },
    }),

  shareGame: () =>
    Promise.resolve({
      code: 200,
      message: "Share game success",
      data: {},
    }),

  allocateVoucher: () =>
    Promise.resolve({
      code: 200,
      message: "Allocate voucher success",
      data: {
        status: true,
        variantId: 123,
        storyId: 456,
        serverIP: "server_ip",
        serverName: "server_name",
        serverTime: "server_time",
        responseTime: "response_time",
        webContents: {
          contents: {
            id: 1,
            promotion_code: "CODE_TEST",
            scheme_id: "SCHEME_TEST",
            icon: "",
            description: "",
            expire_time: "2027-01-01 00:00:00",
            name: "Voucher Test",
            image_url: "",
            type: "voucher",
            atmTrackingParameters: "",
            expiry_date: "2027-01-01 00:00:00",
            start_date: "2027-01-01 00:00:00",
            globalTracking: {},
          },
        },
      },
    }),

  getLeaderboard: () =>
    Promise.resolve({
      code: 200,
      message: "Get leaderboard success",
      data: [
        {
          avatar: null,
          createdAt: "2025-12-22T06:41:48.033Z",
          endDate: "2025-12-28T16:59:59.999Z",
          gameCode: "aristino-christmas",
          name: "Nguyen Van A",
          playCount: 1,
          playTime: null,
          portalId: 564891226,
          rank: 1,
          score: 425,
          shareCount: 0,
          startDate: "2025-12-21T17:00:00.000Z",
          updatedAt: "2025-12-22T06:41:48.033Z",
          userId: "3368637342326461234",
        },
        {
          avatar: null,
          createdAt: "2025-12-22T06:41:48.033Z",
          endDate: "2025-12-28T16:59:59.999Z",
          gameCode: "aristino-christmas",
          name: "Dang Van B",
          playCount: 1,
          playTime: null,
          portalId: 564891226,
          rank: 2,
          score: 425,
          shareCount: 0,
          startDate: "2025-12-21T17:00:00.000Z",
          updatedAt: "2025-12-22T06:41:48.033Z",
          userId: "3368637342326461235",
        },
        {
          avatar: null,
          createdAt: "2025-12-22T06:41:48.033Z",
          endDate: "2025-12-28T16:59:59.999Z",
          gameCode: "aristino-christmas",
          name: "Tran Van A",
          playCount: 1,
          playTime: null,
          portalId: 564891226,
          rank: 3,
          score: 425,
          shareCount: 0,
          startDate: "2025-12-21T17:00:00.000Z",
          updatedAt: "2025-12-22T06:41:48.033Z",
          userId: "3368637342326461236",
        },
      ],
    }),

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
