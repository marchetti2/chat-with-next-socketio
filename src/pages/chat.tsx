import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import {
  Grid,
  Input,
  Stack,
  Button,
  Flex,
  Avatar,
  AvatarBadge,
  Text,
  useDisclosure,
  useToast,
  Divider,
  Box,
} from "@chakra-ui/core";

import {Unauthorized} from "./unauthorized"

import styles from '../styles/Background.module.css'

import { Msg } from "../components/messages";
import { CustomModal } from "../components/Modal";
import { Context } from "../contexts";
import { ErrorToast } from "../components/Toast";
import { HamburgerIcon } from "@chakra-ui/icons";
import {Messages} from "../dtos/MessageDTO"

const socket = io();

const Chat: React.FC = ({stars}) => {

  const msgRef = useRef<HTMLInputElement>(null);
  const [showChatWindow, setShowChatWindow] = useState<Boolean>(false);
  const [usersList, setUsersList] = useState<Array<string>>([]);
  const [usersListPreviewMessage, setUsersListPreviewMessage] = useState<string>('');
  const { name } = Context();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  var key = 0

  useEffect(() => {
    socket.emit("loadMessagesFromServer", null);
  }, []);

  useEffect(() => {
    socket.on('returnedMessage', (msg: Messages): void => {
      const msgIndex = msg.length> 0?msg[msg.length - 1].msg:""
      setUsersListPreviewMessage(msgIndex)
    })
  }, []);

  useEffect(() => {
    socket.emit("usersIn",null)
    socket.on("users", users => {
     // const usersWithoutCurrent = users.filter(user=>user!==name)
      setUsersList(users);
    });
    console.log("oioioioioioioioioio")
  }, [name]);

  //const memo = ()=>{
  //  setShowChatWindow(true)
  //}

  const handleShowChatWindow = () => {
    socket.emit("loadMessagesFromServer", null);
    socket.emit("room", name)
    setShowChatWindow(true)
  }

  const handleSend = useCallback(() => {
    const msg = msgRef.current?.value;

    if (!msg) {
      return ErrorToast("Type a message", toast);
    }

    const formatedDate = (): string => {
      var currentDate = new Date();
      var hour = `${(currentDate.getHours()<10 ? '0' : '')}${currentDate.getHours()}`
      var minute = `${(currentDate.getMinutes()<10 ? '0' : '')}${currentDate.getMinutes()}`
      var day = `${(currentDate.getDate()<10 ? '0' : '')}${currentDate.getDate()}`
      var month = `${(currentDate.getMonth()<10 ? '0' : '')}${currentDate.getMonth()}`
      return `${hour}:${minute} ${day}/${month}`;
    };

    const response = {
      msg: msg,
      date: formatedDate()
    }

    socket.emit("sendMessages", response);

    socket.on('returnedMessage', (msg: Messages): void => {
      console.log('resre')
      const msgIndex = msg[msg.length - 1].msg
      console.log(msgIndex)

      setUsersListPreviewMessage(msgIndex)
    })
  }, []);

  return (
    <>
    {name!==""?(
          <>
          <Head>
            <title>Super Chat</title>
          </Head>
          <CustomModal isOpen={isOpen} onClose={onClose} />
          <Grid
            as="main"
            h="100vh"
            w="100vw"
            gridTemplateColumns="300px 1fr"
            gridTemplateRows="1fr"
            alignItems="center"
            justifyContent="center"
            border="1px"
            borderColor="gray.200"
          >
            <Grid
              h="100%"
              w="100%"
              gridTemplateRows="59px 45px 1fr"
              gridTemplateColumns="1fr"
              bgColor="#f7f9fa"
              borderRight="1px"
              borderColor="gray.200"
            >
              <Flex
                h="100%"
                w="100%"
                alignItems="center"
                justifyContent="space-around"
                borderBottom="1px"
                borderColor="gray.200"
                bgColor="#eee"
                p="10px 16px"
              >
                <Stack
                  h="100%"
                  w="100%"
                  alignItems="center"
                  justifyContent="flex-start"
                  direction="row"
                  spacing={4}
                >
                  ]
                  <Avatar size="sm" onClick={onOpen} />
                  <Text
                    fontSize="12px"
                    fontWeight="bold"
                    color="gray.500"
                    textTransform="capitalize"
                  >
                    {name}
                  </Text>
                </Stack>
                <HamburgerIcon boxSize={5} color="gray.500" />
              </Flex>

              <Flex
                borderBottom="1px"
                borderColor="gray.200"
                w="100%"
                as="form"
                onSubmit={e => e.preventDefault()}
                bgColor="#eee"
                alignItems="center"
                justifyContent="center"
                p="10px 10px"
              >
                <Input
                  h="30px"
                  type="text"
                  focusBorderColor="teal.500"
                  placeholder="search"
                  bgColor="#fff"
                  ref={msgRef}
                />
              </Flex>

              <Flex
                h="calc(100vh - 106px)"
                w="100%"
                bg="#fff"
                flexDir="column"
                overflowY="scroll"
              >
                {usersList.map(list => (
                      <Box
                      key={key++}
                      >
                        <Stack
                          h="70px"
                          w="100%"
                          alignItems="center"
                          justifyContent="flex-start"
                          direction="row"
                          spacing={4}
                          p="10px 16px"
                          cursor="pointer"
                          _hover={{ bg: " #eaf6f1"}}
                          onClick={handleShowChatWindow}
                        >
                          ]
                          <Avatar size="md" onClick={onOpen}>
                            <AvatarBadge border="1px" boxSize="15px" bg="green.500" />
                          </Avatar>
                          <Flex flexDirection="column">
                            <Text
                              fontSize="12px"
                              fontWeight="bold"
                              color="gray.500"
                              textTransform="capitalize"
                            >
                              {list}
                            </Text>
                            <Text maxW="190px" as="i" fontSize="12px" color="gray.400" isTruncated>
                              {usersListPreviewMessage}
                            </Text>
                          </Flex>
                        </Stack>
                        <Divider />
                      </Box>
                    ))
                }
              </Flex>
            </Grid>

            {showChatWindow?(
                      <Grid
                      h="100%"
                      alignItems="center"
                      gridTemplateRows="59px 1fr 90px"
                      gridTemplateColumns="1fr"
                      bgColor="#f7f9fa"
                    >
                      <Flex
                        h="100%"
                        w="100%"
                        borderBottom="1px"
                        borderColor="gray.200"
                        bgColor="#eee"
                        alignItems="center"
                        justifyContent="space-between"
                        direction="row"
                        p="10px 16px"
                      >
                        <Flex />
                        <Text
                          fontSize="12px"
                          fontWeight="bold"
                          color="gray.500"
                          textTransform="capitalize"
                        >
                          Fulano
                        </Text>
                        <Avatar size="sm"></Avatar>
                      </Flex>

                      <Flex
                        className={styles.svg}
                        h="calc(100vh - 151px)"
                        w="100%"
                        flexDir="column"
                        alignItems='flex-end'
                        overflowY="scroll"
                        p="20px"
                      >
                        <Msg />
                      </Flex>

                      <Stack
                        borderTop="1px"
                        borderColor="gray.200"
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
                          placeholder="type your message"
                          bgColor="#fff"
                          ref={msgRef}
                        />
                        <Button
                          type="reset"
                          onClick={handleSend}
                          colorScheme="teal"
                          variant="solid"
                        >
                          Send
                        </Button>
                      </Stack>
                    </Grid>
            ):(<Flex alignItems="center" justifyContent="center">Bem Vindo!
            </Flex>)
            }
      </Grid>
        </>
    ):(<Unauthorized/>)}
    </>
  )
}

export default Chat;




