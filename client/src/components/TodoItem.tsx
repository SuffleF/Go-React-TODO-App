import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle, FaHourglassEnd } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {

	const queryClient = useQueryClient();

	const { mutate: updateTodo, isPending: isUpdating } = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: async () => {

			if (todo.completed) return alert("Todo is already completed");

			try {
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
					method: "PATCH",
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} 
			catch (error) {
				console.log(error);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: async () => {

			try {
				const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
					method: "DELETE",
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} 
			
			catch (error) {
				console.log(error);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	return (
		<Flex
			flex={1}
			alignItems={"center"}
			borderWidth={"1px"}
			borderColor={"gray.400/50"}
			p={2}
			rounded={"sm"}
			justifyContent={"space-between"}
		>
			<Text	
				lineClamp={2}
				color={todo.completed ? "completed-color" : "progress-color"}
				textDecoration={todo.completed ? "line-through" : "none"}
			>
				{todo.body}
			</Text>

			<Flex
				alignItems={"center"}
				gap={1}
				>
				{todo.completed && (
					<Flex
						alignItems={"center"}
						gap={2}>
						<Badge colorScheme={"green"} layerStyle={"fill.muted"}>
							Completed
						</Badge>
						<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
							{!isUpdating && <FaCheckCircle size={18} />}
							{isUpdating && <Spinner size={"sm"} />}
						</Box>
					</Flex>
				)}
				{!todo.completed && (
					<Flex 
						alignItems={"center"}
						gap={2}>
						<Badge colorScheme={"yellow"} layerStyle={"fill.muted"}>
							In Progress
						</Badge>
						<Box color={"green.500"} cursor={"pointer"} onClick={() => updateTodo()}>
							{!isUpdating && <FaHourglassEnd size={18} />}
							{isUpdating && <Spinner size={"sm"} />}
						</Box>
					</Flex>
				)}
				<Box color={"red.500"} cursor={"pointer"} onClick={() => deleteTodo()}>
					{!isDeleting && <MdDelete size={23} />}
					{isDeleting && <Spinner size={"sm"} />}
				</Box>
			</Flex>
		</Flex>
	);
};

export default TodoItem;