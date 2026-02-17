import {
    Box,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
    HStack,
    Select,
    Textarea,
    Button,
    useToast,
    IconButton,
    Input
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";

const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const QUARTERS = [
    { label: "Primer Trimestre (Q1)", months: [0, 1, 2] },
    { label: "Segundo Trimestre (Q2)", months: [3, 4, 5] },
    { label: "Tercer Trimestre (Q3)", months: [6, 7, 8] },
    { label: "Cuarto Trimestre (Q4)", months: [9, 10, 11] },
];

const SEMESTERS = [
    { label: "Primer Semestre (S1)", months: [0, 1, 2, 3, 4, 5] },
    { label: "Segundo Semestre (S2)", months: [6, 7, 8, 9, 10, 11] },
];

// Helper to get weeks for a month to display navigation buttons
const getWeeksInMonth = (year, monthIndex) => {
    const weeks = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    let currentDay = new Date(firstDayOfMonth);

    // Adjust to start on Monday
    let dayOfWeek = currentDay.getDay(); // 0 (Sun) to 6 (Sat)
    let diffToMonday = (dayOfWeek + 6) % 7; // Distance to previous Monday
    currentDay.setDate(currentDay.getDate() - diffToMonday);

    while (currentDay <= lastDayOfMonth || weeks.length === 0) {
        const endOfWeek = new Date(currentDay);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        const overlapsMonth = (currentDay <= lastDayOfMonth) && (endOfWeek >= firstDayOfMonth);

        if (overlapsMonth) {
            weeks.push(new Date(currentDay));
        }
        currentDay.setDate(currentDay.getDate() + 7);
        if (currentDay.getFullYear() > year && currentDay.getMonth() > monthIndex) break;
        if (weeks.length > 6) break;
    }
    return weeks;
};

export function Monthly({ onNavigateToWeekly }) {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [filterType, setFilterType] = useState("all"); // all, quarter, semester
    const [selectedPeriod, setSelectedPeriod] = useState(0); // index for quarter/semester array

    const [monthlyNotes, setMonthlyNotes] = useState(() => {
        const saved = localStorage.getItem("monthlyNotes");
        return saved ? JSON.parse(saved) : {};
    });

    const toast = useToast();

    // Persist notes
    useEffect(() => {
        localStorage.setItem("monthlyNotes", JSON.stringify(monthlyNotes));
    }, [monthlyNotes]);

    const handleNoteChange = (monthIndex, value) => {
        setMonthlyNotes(prev => ({
            ...prev,
            [`${year}-${monthIndex}`]: value
        }));
    };

    // Determine which months to show
    let visibleMonths = [];
    if (filterType === "all") {
        visibleMonths = MONTHS.map((name, index) => ({ name, index }));
    } else if (filterType === "quarter") {
        visibleMonths = QUARTERS[selectedPeriod].months.map(index => ({ name: MONTHS[index], index }));
    } else if (filterType === "semester") {
        visibleMonths = SEMESTERS[selectedPeriod].months.map(index => ({ name: MONTHS[index], index }));
    }

    return (
        <VStack spacing={6} align="stretch" w="full">
            <Heading size="lg" textAlign="center">Vista Mensual</Heading>

            {/* Controls */}
            <HStack spacing={4} justify="center" bg="white" p={4} borderRadius="md" shadow="sm" wrap="wrap">
                <Box>
                    <Text fontSize="sm" fontWeight="bold">Año</Text>
                    <Input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        w="100px"
                    />
                </Box>

                <Box>
                    <Text fontSize="sm" fontWeight="bold">Filtrar por</Text>
                    <Select value={filterType} onChange={(e) => {
                        setFilterType(e.target.value);
                        setSelectedPeriod(0); // Reset period selection
                    }} w="200px">
                        <option value="all">Todo el Año</option>
                        <option value="quarter">Trimestre</option>
                        <option value="semester">Semestre</option>
                    </Select>
                </Box>

                {filterType !== "all" && (
                    <Box>
                        <Text fontSize="sm" fontWeight="bold">Período</Text>
                        <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(Number(e.target.value))} w="250px">
                            {filterType === "quarter" && QUARTERS.map((q, i) => (
                                <option key={i} value={i}>{q.label}</option>
                            ))}
                            {filterType === "semester" && SEMESTERS.map((s, i) => (
                                <option key={i} value={i}>{s.label}</option>
                            ))}
                        </Select>
                    </Box>
                )}
            </HStack>

            {/* Grid of Months */}
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {visibleMonths.map(({ name, index }) => {
                    const monthWeeks = getWeeksInMonth(year, index);
                    const noteKey = `${year}-${index}`;

                    return (
                        <GridItem key={index} bg="white" p={4} borderRadius="lg" shadow="md" border="1px solid" borderColor="gray.100">
                            <VStack align="stretch" spacing={3}>
                                <Heading size="md" color="green.600">{name}</Heading>

                                {/* Notes Area */}
                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" mb={1} color="gray.500">Notas / Objetivos del Mes</Text>
                                    <Textarea
                                        placeholder={`Notas para ${name}...`}
                                        value={monthlyNotes[noteKey] || ""}
                                        onChange={(e) => handleNoteChange(index, e.target.value)}
                                        size="sm"
                                        resize="vertical"
                                        rows={3}
                                        borderColor="gray.300"
                                    />
                                </Box>

                                {/* Weekly Navigation */}
                                <Box>
                                    <Text fontSize="xs" fontWeight="bold" mb={2} color="gray.500">Ir a Semana:</Text>
                                    <Grid templateColumns="repeat(auto-fill, minmax(60px, 1fr))" gap={2}>
                                        {monthWeeks.map((weekStart, wIndex) => {
                                            const weekEnd = new Date(weekStart);
                                            weekEnd.setDate(weekEnd.getDate() + 6);
                                            return (
                                                <Button
                                                    key={wIndex}
                                                    size="xs"
                                                    colorScheme="blue"
                                                    variant="outline"
                                                    onClick={() => onNavigateToWeekly(year, index, wIndex)}
                                                    title={`Semana del ${weekStart.getDate()} al ${weekEnd.getDate()}`}
                                                >
                                                    Sem {wIndex + 1}
                                                </Button>
                                            );
                                        })}
                                    </Grid>
                                </Box>
                            </VStack>
                        </GridItem>
                    );
                })}
            </Grid>
        </VStack>
    );
}