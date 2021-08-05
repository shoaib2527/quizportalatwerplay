import { Box, ChakraProvider, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  const route = useRouter()
  return (
    <ChakraProvider>
      <Flex bg={"blue.300"} p={4} justifyContent="space-between" position='fixed' top={0} left={0} w="100vw">
        <Flex alignItems = 'flex-end'>
          <Text color="white" fontWeight="bold" fontSize={'2xl'}>Quiz@WerPlay</Text>
          <Text color="white" mx = {5} fontWeight="bold" fontSize={'1xl'}>(Dev Shoaib Ahmed)</Text>
        </Flex>
        <Flex>
          <Link href="/">
            <Text mx={5} fontWeight='bold' px={4} py={1} borderRadius={3} bg={route.pathname == '/' ? "white" : "blue.300"} color={route.pathname == '/' ? "blue.300" : "white"} letterSpacing={2} cursor="pointer">Users</Text>
          </Link>
          <Link href="/categories">
            <Text mx={5} fontWeight='bold' px={4} py={1} borderRadius={3} bg={route.pathname != '/' ? "white" : "blue.300"} color={route.pathname != '/' ? "blue.300" : "white"} letterSpacing={2} cursor="pointer">Categories</Text>
          </Link>
        </Flex>
      </Flex>
      <Box pt={20}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp