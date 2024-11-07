import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";
import { calendarService } from '../../services/calendarService';
import './Calendar.css';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [importantDates, setImportantDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const datePickerRef = useRef(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const loadImportantDates = (monthDate) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();

        const dates = importantDates
            .filter(item => {
                const date = new Date(item.data);
                return date.getFullYear() === year && date.getMonth() === month && item.ocupado === true;
            })
            .map(item => new Date(item.data));

        return dates;
    };

    const fetchAgenda = async (monthDate) => {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth() + 1;

        try {
            const agendaData = await calendarService(1, `${year}-${month < 10 ? '0' + month : month}-01T01:00:00`);
            setImportantDates(agendaData);
        } catch (error) {
            console.error("Erro ao buscar as datas ocupadas:", error);
        }
    };

    useEffect(() => {
        fetchAgenda(currentMonth);
    }, [currentMonth]);

    const handleMonthChange = (date) => {
        setCurrentMonth(date);
        if (!selectedDate) {
            const firstAvailableDate = loadImportantDates(date)[0] || new Date(date.getFullYear(), date.getMonth(), 1);
            setSelectedDate(firstAvailableDate);
        }
    };

    const toggleCalendar = () => {
        setCalendarOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setCalendarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={datePickerRef}>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                onMonthChange={handleMonthChange}
                dateFormat="dd/MM/yyyy"
                highlightDates={loadImportantDates(currentMonth)}
                inline={calendarOpen}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onClick={toggleCalendar}
                isClearable
                locale={ptBR}
            />
        </div>
    );
};

export default Calendar;
