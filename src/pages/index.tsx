import Head from "next/head";
import React, { useCallback, useRef, useState } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { Grid, Input, Stack, Button, Flex, useToast } from "@chakra-ui/core";

import { ErrorToast } from "../components/Toast";
import { Context } from "../contexts";
const socket = io("/");


const Home: React.FC = () => {

  const router = useRouter();
  const { setUsername } = Context();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSend = useCallback(() => {
    setLoading(true)
    const name = nicknameRef.current?.value;

    if (!name) {
      setLoading(false)
      return ErrorToast("enter your nickname", toast);
    }

    socket.emit("user", name, async (verify: any) => {
      if (verify) {
        setUsername(name)
        await router.push("/chat");
        return setLoading(false)
      }
      setLoading(false)
      return ErrorToast("nickname already in use", toast);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Super Chat</title>
      </Head>

      <Flex
        as="main"
        h="100vh"
        w="100vw"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          h="200px"
          w="400px"
          alignItems="center"
          gridTemplateRows="1fr"
          gridTemplateColumns="1fr"
          bgColor="#f7f9fa"
          border="1px"
          borderColor="teal.500"
          borderRadius="lg"
        >
          <Stack
            w="100%"
            as="form"
            direction="row"
            spacing={4}
            onSubmit={e => e.preventDefault()}
            p="25px"
          >
            <Input
              type="text"
              focusBorderColor="teal.500"
              placeholder="enter your nickname"
              bgColor="#fff"
              ref={nicknameRef}
            />
            <Button
              type="reset"
              onClick={handleSend}
              colorScheme="teal"
              variant="solid"
              isLoading={loading}
            >
              Sign In
            </Button>
          </Stack>
        </Grid>
      </Flex>
    </>
  );
};

export default Home;
