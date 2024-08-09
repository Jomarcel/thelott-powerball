import { FC } from "react";

export const ErrorMessage: FC<{ error: Error | null }> = ({ error }) => {
  if (!error) return;
  return <>{error.message}</>;
};
