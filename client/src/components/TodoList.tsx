import { Container, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../App";

export type Todo = {
	_id: number;
	body: string;
	completed: boolean;
}

const TodoList = () => {
	const { data: todos, isLoading} = useQuery<Todo[]>({
		queryKey: ["todos"],

		queryFn: async () => {
			try {
				const res = await fetch(BASE_URL + "/todos");

				const data = await res.json();

				if(!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}

				return data || [];
			} 
			
			catch (error) {
				console.log(error);
			}
		},
	})
	return (
		<>	
			{/* title and todos */}
			<Container maxW={"840px"} px={0}>
				<Text fontSize={"3xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} mb={2} mt={8} bgGradient={"to-r"} gradientFrom={"#0b85f8"} gradientTo={"#00ffff"} bgClip={"text"}>
					Today's Tasks
				</Text>
				{isLoading && (
					<Flex justifyContent={"center"} my={4}>
						<Spinner size={"xl"} />
					</Flex>
				)}
				{!isLoading && todos?.length === 0 && (
					<Stack alignItems={"center"}>
						<Text fontSize={"xl"} mt={-3} textAlign={"center"} color={"gray.500"}>
							All tasks completed!
						</Text>
					</Stack>
				)}
				<Stack gap={3}>
					{todos?.map((todo) => (
						<TodoItem key={todo._id} todo={todo} />
					))}
				</Stack>
			</Container>
		</>
	);
};
export default TodoList;