import {Flex} from '@chakra-ui/core'

const ErrorToast = (text: string, toast: any) => {
  return toast({
           position: "top-right",
           render: () => (
            <Flex m={3} color="white" alignItems="center" justifyContent="center" borderRadius="sm" p={3} bg="teal.500">
              {text}
            </Flex>
          ),
           duration: 2000,
           isClosable: true,
         })
}
export {ErrorToast}
