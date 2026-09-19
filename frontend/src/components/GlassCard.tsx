import type { ReactNode } from "react";

import { Paper } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function GlassCard({
  children,
}: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: 430,
        p: 5,

        borderRadius: 5,

        background: "rgba(255,255,255,.18)",

        backdropFilter: "blur(18px)",

        border: "1px solid rgba(255,255,255,.25)",

        boxShadow:
          "0 15px 40px rgba(0,0,0,.25)",
      }}
    >
      {children}
    </Paper>
  );
}