import { Box, Flex, Text, Container, IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes"

export default function Navbar() {
	const { theme, setTheme } = useTheme()

    const toggleColorMode = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

	return (
		<Container maxW={"900px"}>
			<Box background={"navbar-color"} px={4} my={4} rounded={"sm"}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					{/* Left side */}
					<Flex
						justifyContent={"center"}
						alignItems={"center"}
						gap={3}
					>
						<Text fontSize={"xl"} fontWeight={600}>Daily Tasks</Text>
					</Flex>

					{/* Right side */}
					<Flex alignItems={"center"} gap={3}>
						{/* Toggle Color Mode */}
                        <IconButton aria-label="toggle color mode" onClick={toggleColorMode}>
                            {theme === "light" ? <LuMoon /> : <LuSun />}
                        </IconButton>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
}