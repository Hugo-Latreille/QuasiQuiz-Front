import { Stack, Skeleton } from "@mui/material";

const Lobbyskel = () => {
  return (
    // <Box spacing={1} width="250px">
    <Stack spacing={1} width="250px">
      <Skeleton animation="wave" />
      <Skeleton animation="wave" variant="text" />
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <Skeleton animation="wave" variant="rectangular" width={40} height={40} />
    </Stack>
  );
};

export default Lobbyskel;
