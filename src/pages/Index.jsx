import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Button, Text, Input, Heading, Container, SimpleGrid, Image, Flex, Divider } from "@chakra-ui/react";
import { FaShoppingCart, FaUserShield, FaSignInAlt } from "react-icons/fa";

const products = [
  { id: 1, name: "Laptop", price: 999, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsYXB0b3B8ZW58MHx8fHwxNzE1MjUwMzI0fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "Smartphone", price: 699, image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lfGVufDB8fHx8MTcxNTI1MDMyNXww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Headphones", price: 199, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzfGVufDB8fHx8MTcxNTI1MDMyNXww&ixlib=rb-4.0.3&q=80&w=1080" },
];

const users = [
  { id: 1, username: "admin", password: "admin", role: "admin" },
  { id: 2, username: "user", password: "user", role: "user" },
];

const Index = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const foundUser = users.find((u) => u.username === username && u.password === password);
    setUser(foundUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const isAdmin = user && user.role === "admin";

  return (
    <ChakraProvider>
      <Container maxW="container.xl">
        <VStack spacing={4} align="stretch">
          {user ? (
            <Box>
              <Flex justifyContent="space-between" alignItems="center">
                <Text>
                  Welcome, {user.username} ({user.role})
                </Text>
                <Button leftIcon={<FaSignInAlt />} onClick={handleLogout}>
                  Logout
                </Button>
              </Flex>
              <Divider my={4} />
              {isAdmin ? (
                <AdminPanel users={users} />
              ) : (
                <SimpleGrid columns={3} spacing={10}>
                  {products.map((product) => (
                    <Box key={product.id} p={5} shadow="md" borderWidth="1px">
                      <Image src={product.image} alt={product.name} />
                      <Text mt={2}>{product.name}</Text>
                      <Text>${product.price}</Text>
                      <Button leftIcon={<FaShoppingCart />} onClick={() => addToCart(product)} mt={3}>
                        Add to Cart
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          ) : (
            <Flex height="100vh" alignItems="center" justifyContent="center">
              <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading>Login</Heading>
                <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button leftIcon={<FaUserShield />} onClick={handleLogin} mt={3}>
                  Login
                </Button>
              </Box>
            </Flex>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

const AdminPanel = ({ users }) => (
  <VStack>
    <Heading size="md">Admin Panel</Heading>
    {users.map((user) => (
      <Text key={user.id}>
        {user.username} - {user.role}
      </Text>
    ))}
  </VStack>
);

export default Index;
