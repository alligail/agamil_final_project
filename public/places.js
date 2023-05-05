let markers = new Array();
let map = null;

const generateMap = async() =>{
    console.log("INSIDE generateMap()");

    map = L.map('map').setView([41, -74], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

//function call to when a row is clicked
const on_row_click = (e) => {
    // the element clicked
   console.log(e.target)
   // prints the element type (ie. TD)
   console.log(e.target.tagName) 

   let row = e.target;
   if (e.target.tagName.toUpperCase() === 'TD') {
       row = e.target.parentNode;
   }
   
   //extracting the lat and long for the map to fly to
   const lat = row.dataset.lat;
   const lng = row.dataset.lng;

   if(lat !== undefined && lng !== undefined){
       map.flyTo(new L.LatLng(lat, lng));
   }
}

const loadContacts = async () => {
    console.log("INSIDE loadPlaces()");

    const response = await axios.get('/contactlist');
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (var i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }

    //[TEST] Displaying all the contacts
    console.log(response.data.contacts);
    console.log('LOGGED IN? IN LOAD PLACES: ' + response.data.check);

    if(response && response.data && response.data.contacts){
        for(const c of response.data.contacts){
            const tr = document.createElement('tr');

            if(response.data.check === true){
                tr.innerHTML = `
                <td>${c.title} ${c.firstname} ${c.lastname}</td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td>${c.address}</td>
                <td> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbyphone ? 'checked' : ''} disabled>
                        <labelfor="phone${c.id}"> Phone </label>
                    </div> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbyemail ? 'checked' : ''} disabled>
                        <labelfor="email${c.id}"> Email </label>
                    </div> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbymail ? 'checked' : ''} disabled>
                        <label for="mail${c.id}"> Mail </label>
                    </div> 
                </td>
                <td> ${c.lat} </td>
                <td> ${c.long} </td>
                <td>
                    <a href="/edit/${c.id}">Edit</a>
                    <a href="/contactlist/${c.id}/delete">Delete</a>
                </td>
                `;
            }else{
                tr.innerHTML = `
                <td>${c.title} ${c.firstname} ${c.lastname}</td>
                <td>${c.phone}</td>
                <td>${c.email}</td>
                <td>${c.address}</td>
                <td> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbyphone ? 'checked' : ''} disabled>
                        <label for="phone${c.id}"> Phone </label>
                    </div> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbyemail ? 'checked' : ''} disabled>
                        <label for="email${c.id}"> Email </label>
                    </div> 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="byPhone" ${c.contactbymail ? 'checked' : ''} disabled>
                        <label for="mail${c.id}"> Mail </label>
                    </div> 
                </td>
                <td> ${c.lat} </td>
                <td> ${c.long} </td>
                `;
            }
            
            tr.dataset.lat = c.lat;
            tr.dataset.lng = c.long;
            tr.onclick = on_row_click;
            tbody.appendChild(tr);

            //adding markers to the map 
            if(c.lat != 0 && cancelAnimationFrame.long != 0){
                let marker = L.marker([c.lat, c.long]).addTo(map);
                marker.bindPopup(`<b>${c.title} ${c.firstname} ${c.lastname}</b><br/>${c.address}`);
                markers.push(marker);
            }
              
        }
    }
}

const updateContact = async (id) => {
    console.log("Inside updateContract");
    await axios.get(`/edit/${id}`);
}


const deleteContact = async (id) => {
    await axios.get(`/contactlist/${id}/delete`);
    await loadContacts();
}

