const countrySelect = document.getElementById("country");
      const stateSelect = document.getElementById("state");
      const citySelect = document.getElementById("city");
      let contID;
      let stateID;
      let cityID;
      // Fetch country data from the provided URL
      fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          data["data"].forEach((country) => {
            const option = document.createElement("option");
            option.value = country.id;

            option.textContent = country.name;
            countrySelect.appendChild(option);
          });
        })
        .catch((error) => console.error("Error fetching countries:", error));

      countrySelect.addEventListener("change", function () {
        const selectedCountry = countrySelect.value;
        stateSelect.innerHTML = "<option value=''>Select State</option>";
        citySelect.innerHTML = "<option value=''>Select City</option>";

        // Fetch state data based on the selected country
        if (selectedCountry) {
          fetch(
            `https://d32sbion19muhj.cloudfront.net/pub/interview/states?country=${selectedCountry}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              data["data"].forEach((state) => {
                if (selectedCountry == state.country_id) {
                  const option = document.createElement("option");
                  option.value = state.id;
                  option.textContent = state.name;
                  stateSelect.appendChild(option);
                  console.log(state.name);
                }
              });
            })
            .catch((error) => console.error("Error fetching states:", error));
        }
      });

      stateSelect.addEventListener("change", function () {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = "<option value=''>Select City</option>";

        // Fetch city data based on the selected state
        if (selectedState) {
          fetch(
            `https://d32sbion19muhj.cloudfront.net/pub/interview/cities?state=${selectedState}`
          )
            .then((response) => response.json())
            .then((data) => {
              data["data"].forEach((city) => {
                if (selectedState == city.state_id) {
                  const option = document.createElement("option");
                  option.value = city.id;
                  option.textContent = city.name;
                  console.log(city.name);
                  citySelect.appendChild(option);
                }
              });
            })
            .catch((error) => console.error("Error fetching cities:", error));
        }
      });