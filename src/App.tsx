import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
// import { Logo } from "./Logo"
import Home from "./pages/Home"

export const App = () => (
  <ChakraProvider theme={theme}>
  <Box textAlign="center" px="5" fontSize="md">
    <Grid minH="100vh" p={3}>
    {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Home />
    </Grid>
  </Box>
</ChakraProvider>
)
