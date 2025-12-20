// import * as Sentry from "@sentry/react";

type ErrorContext = {
  component?: string;
  action?: string;
  extraData?: Record<string, unknown>;
  tags?: Record<string, string>;
  [key: string]: unknown;
};

function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

export const handleError = (error: unknown, context: ErrorContext): void => {
  const { component, action, extraData, tags, ...rest } = context;
  const errorMessage = normalizeError(error);

  // Sentry.captureException(errorMessage, {
  //   tags: {
  //     component: component || "UnknownComponent",
  //     action: action || "UnknownAction",
  //     ...tags,
  //   },
  //   extra: {
  //     ...extraData,
  //     component,
  //     action,
  //     error: errorMessage,
  //   },
  //   ...rest,
  // });
};
