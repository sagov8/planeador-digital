import {
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    useToast,
    IconButton,
    Select,
    HStack
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6:00 to 22:00
const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Helper to get weeks in a month
const getWeeksInMonth = (year, monthIndex) => {
    const weeks = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    let currentDay = new Date(firstDayOfMonth);

    // Adjust to start on Monday
    let dayOfWeek = currentDay.getDay(); // 0 (Sun) to 6 (Sat)
    let diffToMonday = (dayOfWeek + 6) % 7; // Distance to previous Monday

    currentDay.setDate(currentDay.getDate() - diffToMonday);

    // Iterate until we cover the full month
    while (currentDay <= lastDayOfMonth || weeks.length === 0) {

        // Check if this week has ANY days in the current month
        const endOfWeek = new Date(currentDay);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        const overlapsMonth = (currentDay <= lastDayOfMonth) && (endOfWeek >= firstDayOfMonth);

        if (overlapsMonth) {
            weeks.push(new Date(currentDay));
        }

        // Move to next week
        currentDay.setDate(currentDay.getDate() + 7);

        // Safety break
        if (currentDay.getFullYear() > year && currentDay.getMonth() > monthIndex) break;
        if (weeks.length > 6) break;
    }
    return weeks;
};

export function Weekly() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("weeklyTasksV2");
        return saved ? JSON.parse(saved) : {};
    });

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
    const [weeks, setWeeks] = useState([]);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [taskInput, setTaskInput] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Calculate weeks when month/year changes
    useEffect(() => {
        const calculatedWeeks = getWeeksInMonth(currentYear, selectedMonth);
        setWeeks(calculatedWeeks);

        // Find the week that contains today if possible, otherwise 0
        // For now, simpler to just default to 0 when changing month
        setSelectedWeekIndex(0);
    }, [currentYear, selectedMonth]);

    // Determine the 7 days to display based on selected week
    const currentWeekStart = weeks[selectedWeekIndex];
    const weekDates = useMemo(() => {
        if (!currentWeekStart) return [];
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(currentWeekStart);
            d.setDate(d.getDate() + i);
            dates.push(d);
        }
        return dates;
    }, [currentWeekStart]);


    useEffect(() => {
        localStorage.setItem("weeklyTasksV2", JSON.stringify(tasks));
    }, [tasks]);

    const handleSlotClick = (dateObj, hour) => {
        // Key format: YYYY-MM-DD-HH
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');

        const slotKey = `${y}-${m}-${d}-${hour}`;

        setSelectedSlot(slotKey);
        setTaskInput(tasks[slotKey] || "");
        onOpen();
    };

    const handleSaveTask = () => {
        if (!selectedSlot) return;

        if (taskInput.trim() === "") {
            handleDeleteTask();
            return;
        }

        setTasks(prev => ({
            ...prev,
            [selectedSlot]: taskInput
        }));

        onClose();
        toast({
            title: "Tarea guardada.",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    const handleDeleteTask = () => {
        if (!selectedSlot) return;

        setTasks(prev => {
            const newTasks = { ...prev };
            delete newTasks[selectedSlot];
            return newTasks;
        });
        onClose();
        toast({
            title: "Tarea eliminada.",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };

    // Format date for display: "Lunes 10"
    const formatDateHeader = (dateObj, index) => {
        if (!dateObj) return DAYS_OF_WEEK[index];
        return `${DAYS_OF_WEEK[index]} ${dateObj.getDate()}`;
    };

    return (
        <VStack spacing={4} align="stretch" h="full" w="full">
            <Heading size="lg" textAlign="center">Vista Semanal</Heading>

            {/* Controls */}
            <HStack spacing={4} justify="center" bg="white" p={3} borderRadius="md" shadow="sm">
                <Select
                    w="150px"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                    {MONTHS.map((m, i) => (
                        <option key={m} value={i}>{m}</option>
                    ))}
                </Select>
                <Text fontWeight="bold">{currentYear}</Text>
                <Select
                    w="250px"
                    value={selectedWeekIndex}
                    onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
                >
                    {weeks.map((weekStart, i) => {
                        if (!weekStart) return null;
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekEnd.getDate() + 6);
                        return (
                            <option key={i} value={i}>
                                Semana {i + 1} ({weekStart.getDate()} - {weekEnd.getDate()})
                            </option>
                        );
                    })}
                </Select>
            </HStack>

            <Box overflowX="auto">
                <Grid templateColumns="80px repeat(7, 1fr)" gap={1} minW="800px">
                    {/* Header Row */}
                    <GridItem bg="gray.100" p={2} borderRadius="md" textAlign="center">
                        <Text fontWeight="bold">Hora</Text>
                    </GridItem>
                    {weekDates.map((dateObj, i) => (
                        <GridItem key={i} bg="primary.100" p={2} borderRadius="md" textAlign="center">
                            <Text fontWeight="bold">{formatDateHeader(dateObj, i)}</Text>
                        </GridItem>
                    ))}

                    {/* Time Slots */}
                    {HOURS.map(hour => (
                        <>
                            {/* Time Label */}
                            <GridItem key={`time-${hour}`} bg="gray.50" p={2} borderRadius="md" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                                <Text fontSize="sm" color="gray.600">{`${hour}:00`}</Text>
                            </GridItem>

                            {/* Day Cells */}
                            {weekDates.map((dateObj, i) => {
                                if (!dateObj) return <GridItem key={i} />;

                                const y = dateObj.getFullYear();
                                const m = String(dateObj.getMonth() + 1).padStart(2, '0');
                                const d = String(dateObj.getDate()).padStart(2, '0');
                                const slotKey = `${y}-${m}-${d}-${hour}`;

                                const hasTask = !!tasks[slotKey];

                                // Helper to check if it matches current day
                                const isToday = today.getDate() === dateObj.getDate() &&
                                    today.getMonth() === dateObj.getMonth() &&
                                    today.getFullYear() === dateObj.getFullYear();

                                return (
                                    <GridItem
                                        key={slotKey}
                                        bg={hasTask ? "green.100" : (isToday ? "blue.50" : "white")}
                                        border="1px solid"
                                        borderColor={isToday ? "blue.200" : "gray.200"}
                                        borderRadius="md"
                                        p={2}
                                        cursor="pointer"
                                        _hover={{ bg: hasTask ? "green.200" : "gray.50" }}
                                        onClick={() => handleSlotClick(dateObj, hour)}
                                        minH="60px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        position="relative"
                                    >
                                        <Text fontSize="sm" noOfLines={2} textAlign="center">
                                            {tasks[slotKey]}
                                        </Text>
                                    </GridItem>
                                );
                            })}
                        </>
                    ))}
                </Grid>
            </Box>

            {/* Task Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {selectedSlot && (() => {
                            const [y, m, d, h] = selectedSlot.split('-');
                            return `Tarea para el ${d}/${m}/${y} a las ${h}:00`;
                        })()}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Escribe tu tarea aquí..."
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTask();
                            }}
                            autoFocus
                        />
                    </ModalBody>

                    <ModalFooter>
                        {tasks[selectedSlot] && (
                            <IconButton
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                variant="ghost"
                                mr={3}
                                onClick={handleDeleteTask}
                                aria-label="Eliminar tarea"
                            />
                        )}
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button colorScheme="blue" onClick={handleSaveTask}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}