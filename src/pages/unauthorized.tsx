import { useRouter } from "next/router";
import {
  Grid,
  Stack,
  Button,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/core";

const Unauthorized = () => {
  const router = useRouter();

  return(
    <>
      <Flex
        as="main"
        h="100vh"
        w="100vw"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          h="100%"
          w="100%"
          alignItems="center"
          gridTemplateRows="1fr"
          gridTemplateColumns="1fr">
          <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection='row'
          >
            <Text fontSize="2xl" fontWeight="bold">401</Text>
            <Stack direction="row" h="100px" p={4}>
              <Divider orientation="vertical" />
            </Stack>
            <Flex flexDirection="column">
            <Text fontSize="sm" fontWeight="bold">Unauthorized</Text>
            <Stack >
              <Text fontSize="sm">You must enter your nickname on the home page.</Text>
              <Button  size="xs" variant="outline" borderRadius="sm" onClick={()=>router.push("/")}>Go to home page</Button>
            </Stack>
            </Flex>
          </Flex>
        </Grid>
      </Flex>
    </>
  )
}

export {Unauthorized}
