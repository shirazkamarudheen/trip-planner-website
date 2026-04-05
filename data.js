export const routesData = [
  // FLIGHTS (12)
  { type: 'flight', origin: 'DEL', dest: 'BOM', operator: 'IndiGo', class: 'Saver', cost: 4500, duration: '2h 15m' },
  { type: 'flight', origin: 'BOM', dest: 'BLR', operator: 'Akasa Air', class: 'Standard', cost: 3800, duration: '1h 50m' },
  { type: 'flight', origin: 'DEL', dest: 'BLR', operator: 'Vistara', class: 'Economy', cost: 6200, duration: '2h 45m' },
  { type: 'flight', origin: 'BLR', dest: 'CCU', operator: 'SpiceJet', class: 'Saver', cost: 4100, duration: '2h 30m' },
  { type: 'flight', origin: 'DEL', dest: 'GOI', operator: 'Air India', class: 'Economy', cost: 5500, duration: '2h 35m' },
  { type: 'flight', origin: 'BOM', dest: 'GOI', operator: 'IndiGo', class: 'Saver', cost: 2800, duration: '1h 20m' },
  { type: 'flight', origin: 'HYD', dest: 'BLR', operator: 'Akasa Air', class: 'Standard', cost: 2200, duration: '1h 10m' },
  { type: 'flight', origin: 'DEL', dest: 'HYD', operator: 'Vistara', class: 'Premium Eco', cost: 8500, duration: '2h 15m' },
  { type: 'flight', origin: 'CCU', dest: 'DEL', operator: 'IndiGo', class: 'Saver', cost: 4800, duration: '2h 20m' },
  { type: 'flight', origin: 'MAA', dest: 'BOM', operator: 'Air India', class: 'Economy', cost: 3500, duration: '1h 55m' },
  { type: 'flight', origin: 'PNQ', dest: 'DEL', operator: 'SpiceJet', class: 'Saver', cost: 4200, duration: '2h 10m' },
  { type: 'flight', origin: 'AMD', dest: 'BLR', operator: 'IndiGo', class: 'Standard', cost: 3900, duration: '2h 05m' },

  // TRAINS (12)
  { type: 'train', origin: 'NDLS', dest: 'BCT', operator: 'Rajdhani Exp', class: '3A', cost: 2800, duration: '15h 40m' },
  { type: 'train', origin: 'NDLS', dest: 'BSB', operator: 'Vande Bharat', class: 'CC', cost: 1750, duration: '8h 00m' },
  { type: 'train', origin: 'SBC', dest: 'MAS', operator: 'Shatabdi Exp', class: 'EC', cost: 2100, duration: '5h 00m' },
  { type: 'train', origin: 'CSMT', dest: 'MAO', operator: 'Tejas Exp', class: 'CC', cost: 1650, duration: '8h 30m' },
  { type: 'train', origin: 'HWH', dest: 'NDLS', operator: 'Duronto Exp', class: '2A', cost: 3200, duration: '17h 15m' },
  { type: 'train', origin: 'BCT', dest: 'ADI', operator: 'Vande Bharat', class: 'CC', cost: 1200, duration: '5h 25m' },
  { type: 'train', origin: 'NDLS', dest: 'CDG', operator: 'Shatabdi', class: 'CC', cost: 850, duration: '3h 25m' },
  { type: 'train', origin: 'MAS', dest: 'MDU', operator: 'Tejas Exp', class: 'CC', cost: 1100, duration: '6h 15m' },
  { type: 'train', origin: 'SC', dest: 'VSKP', operator: 'Vande Bharat', class: 'CC', cost: 1550, duration: '8h 30m' },
  { type: 'train', origin: 'CSMT', dest: 'PUNE', operator: 'Deccan Queen', class: 'CC', cost: 550, duration: '3h 15m' },
  { type: 'train', origin: 'LKO', dest: 'NDLS', operator: 'Shatabdi Exp', class: 'CC', cost: 1050, duration: '6h 40m' },
  { type: 'train', origin: 'SBC', dest: 'UBL', operator: 'Jan Shatabdi', class: '2S', cost: 200, duration: '7h 10m' },

  // BUSES (12)
  { type: 'bus', origin: 'BLR', dest: 'HYD', operator: 'VRL Travels', class: 'AC Sleeper', cost: 1800, duration: '9h 30m' },
  { type: 'bus', origin: 'BOM', dest: 'PUNE', operator: 'MSRTC Shivneri', class: 'AC Seater', cost: 650, duration: '3h 30m' },
  { type: 'bus', origin: 'DEL', dest: 'JAI', operator: 'RSRTC Volvo', class: 'AC Seater', cost: 750, duration: '5h 00m' },
  { type: 'bus', origin: 'BLR', dest: 'GOI', operator: 'KSRTC Airavat', class: 'AC Semi', cost: 1400, duration: '13h 00m' },
  { type: 'bus', origin: 'DEL', dest: 'CHD', operator: 'HRTC Volvo', class: 'AC Seater', cost: 800, duration: '5h 30m' },
  { type: 'bus', origin: 'MAA', dest: 'BLR', operator: 'SRS Travels', class: 'AC Sleeper', cost: 1200, duration: '6h 30m' },
  { type: 'bus', origin: 'DEL', dest: 'AGR', operator: 'NueGo (EV)', class: 'AC Seater', cost: 450, duration: '4h 00m' },
  { type: 'bus', origin: 'BOM', dest: 'GOI', operator: 'Kadamba', class: 'AC Sleeper', cost: 1600, duration: '14h 00m' },
  { type: 'bus', origin: 'HYD', dest: 'VJA', operator: 'APSRTC Garuda', class: 'AC Seater', cost: 700, duration: '5h 30m' },
  { type: 'bus', origin: 'AMD', dest: 'UDR', operator: 'Shrinath', class: 'AC Sleeper', cost: 900, duration: '5h 45m' },
  { type: 'bus', origin: 'BLR', dest: 'MYS', operator: 'KSRTC Flybus', class: 'AC Seater', cost: 400, duration: '3h 00m' },
  { type: 'bus', origin: 'DEL', dest: 'DED', operator: 'UTC Volvo', class: 'AC Seater', cost: 950, duration: '6h 30m' }
];
