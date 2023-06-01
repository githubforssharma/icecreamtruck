const daySelect = document.getElementById('day') as HTMLSelectElement;
const findTruckBtn = document.getElementById('findTruckBtn') as HTMLButtonElement;
const resultsContainer = document.getElementById('results');

findTruckBtn.addEventListener('click', handleSubmit);

interface TruckLocation {
  day: string;
  location: string;
}

async function handleSubmit() {
  const selectedDay = daySelect.value;
  const truckLocations: TruckLocation[] = await fetch('data.json').then((response) =>
    response.json()
  );

  const filteredLocations = truckLocations.filter(
    (location) => location.day === selectedDay
  );

  displayResults(filteredLocations);
}

function displayResults(locations: TruckLocation[]) {
  resultsContainer.innerHTML = '';

  if (locations.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No truck locations found for the selected day.';
    resultsContainer.appendChild(message);
  } else {
    const list = document.createElement('ul');

    locations.forEach((location) => {
      const listItem = document.createElement('li');
      listItem.textContent = location.location;
      list.appendChild(listItem);
    });

    resultsContainer.appendChild(list);
  }
}
