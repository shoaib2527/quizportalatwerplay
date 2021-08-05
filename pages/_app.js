import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  const route = useRouter()
  console.log(route.pathname)
  return (
    <ChakraProvider>
      <Flex bg={"blue.300"} p={4} justifyContent="flex-end" position='fixed' top={0} left={0} w="100vw">
        <Link href="/">
          <Text mx={5} fontWeight='bold' px={4} py={1} borderRadius={3} bg={route.pathname == '/' ? "white" : "blue.300"} color={route.pathname == '/' ? "blue.300" : "white"} letterSpacing={2} cursor="pointer">Users</Text>
        </Link>
        <Link href="/categories">
          <Text mx={5} fontWeight='bold' px={4} py={1} borderRadius={3} bg={route.pathname == '/categories' ? "white" : "blue.300"} color={route.pathname == '/categories' ? "blue.300" : "white"} letterSpacing={2} cursor="pointer">Categories</Text>
        </Link>
        <Link href="/questions">
          <Text mx={5} fontWeight='bold' px={4} py={1} borderRadius={3} bg={route.pathname == '/questions' ? "white" : "blue.300"} color={route.pathname == '/questions' ? "blue.300" : "white"} letterSpacing={2} cursor="pointer">Questions</Text>
        </Link>
      </Flex>
      <Box pt={20}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp