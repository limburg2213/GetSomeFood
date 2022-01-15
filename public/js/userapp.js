const api_url ="http://localhost:5000/api/user/seed";

async function getapi(url){

    const response = await fetch(url);

    var data = await response.json();

    console.log(data);

    show(data);
}

getapi(api_url);

function hideloader(){

    document.getElementById('loading').style.display = 'none';
}


function show(data){

    let tab=`
    <thead >
                      <tr>
                        <th style="border-bottom: 1px solid #ddd !important;" class="col-5" scope="col">ID</th>
                        <th style="border-bottom: 1px solid #ddd !important;" class="col-5" scope="col">NAME</th>
                        <th style="border-bottom: 1px solid #ddd !important;" class="col-5" scope="col">STATUS</th>
                        <th style="border-bottom: 1px solid #ddd !important;" class="col-5" scope="col"></th>
                      </tr>
    </thead>
    `;
    
    for( let r of data){

        tab+= `
        <tr>
        <td id="tdata">${r._id} </td>
        <td id="tdata">${r.name} </td>
        <td id="tdata"><span class="badge alert-success">Active</span></td>
        <td id="tdata">
          <div class="d-flex justify-content-end">
            <span style="white-space: nowrap;"><a href="accounts.html" style="white-space: nowrap;" class="tblbtn btn-sm"><small><i class="fas fa-file-invoice-dollar pe-2"></i> Acounts</small> </a></span>
            <span style="white-space: nowrap;"><a href="/api/user/user/:id" style="white-space: nowrap;" class="tblbtn btn-sm"><small><i class="fas fa-user-edit pe-2"></i> Edit User</small> </a></span>
            <span style="white-space: nowrap;"><a href="" style="white-space: nowrap;" class="tblbtn btn-sm"><small><i class="fas fa-user-minus pe-2"></i> Delete User</small> </a></span>
          </div>
      </td>
      </tr>
        `;
    }

    document.getElementById("mynewuser").innerHTML = tab;
}