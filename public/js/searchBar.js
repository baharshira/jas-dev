const url = 'http://localhost:3000/api/v1/materials'

document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const searchBtn = document.getElementById('search-btn');
    const materialsList = document.getElementById('materials-list');

    async function fetchMaterials() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'success') {
                displayMaterials(data.data.materials);
                setupSearch(data.data.materials);
            } else {
                console.error('Error fetching materials:', data.message);
            }
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    }

    function displayMaterials(materials) {
        materialsList.innerHTML = ''; // Clear previous content

        materials.forEach(material => {
            const card = createMaterialCard(material);
            materialsList.appendChild(card);
        });
    }

    function createMaterialCard(material) {
        const card = document.createElement('div');
        card.classList.add('material-card');

        const nameElement = document.createElement('div');
        nameElement.classList.add('card-name');
        nameElement.textContent = `שם קבלן: ${material['שם קבלן']}`;

        const phoneNumberElement = document.createElement('div');
        phoneNumberElement.textContent = `מס' טלפון: ${material["מס' טלפון"]}`;

        const geographicZoneElement = document.createElement('div');
        geographicZoneElement.textContent = `איזור גיאוגרפי: ${material["איזור גיאוגרפי"]}`;


        card.appendChild(nameElement);
        card.appendChild(phoneNumberElement)
        card.appendChild(geographicZoneElement)

        return card;
    }

    function setupSearch(allMaterials) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchBar.value.trim().toLowerCase();

            const filteredMaterials = allMaterials.filter(material => {
                for (const key in material) {
                    const propertyValue = material[key].toString().toLowerCase();
                    if (propertyValue === 'v' && key.includes(searchTerm)) {
                        return true;
                    }
                }
                return false;
            });

            displayMaterials(filteredMaterials);
        });
    }

    // Fetch materials when the page loads
    fetchMaterials();
});

