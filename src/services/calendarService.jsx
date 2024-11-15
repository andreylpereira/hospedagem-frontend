import api from './api';

export const calendarService = async (idAccommodation, date) => {
  try {
    let formattedDate = null;

    if (date instanceof Date && !isNaN(date)) {
      formattedDate = date.toISOString().split('T').join('T').slice(0, 19);
    } else {
      const dateObj = new Date(date);
      if (dateObj instanceof Date && !isNaN(dateObj)) {
        formattedDate = dateObj.toISOString().split('T').join('T').slice(0, 19);
      }
    }

    if (!formattedDate) {
      throw new Error('Data inválida');
    }

    const _URL = `/hospedagem/agenda/datas/${idAccommodation}/${formattedDate}`;
    const response = await api.get(_URL);

    return response.data;
  } catch (error) {
    return [];
  }
};
