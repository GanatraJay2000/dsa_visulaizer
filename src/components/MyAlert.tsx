import React from "react";
import { Alert, AlertTitle } from "./ui/alert";

type alertVariant = "destructive" | "default" | null | undefined;

function MyAlert({
  title,
  variant = "destructive",
}: {
  title: string;
  variant?: alertVariant;
}) {
  return (
    <Alert className="w-96" variant={variant}>
      <AlertTitle className="mb-0">{title}</AlertTitle>
    </Alert>
  );
}

export default MyAlert;
