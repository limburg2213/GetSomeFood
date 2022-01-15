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
    <tr>
      <th style="border-bottom: 1px solid #ddd !important;" class="col-7" scope="col-6">ID</th>
      <th style="border-bottom: 1px solid #ddd !important;" class="col-3" scope="col-4">NAME</th>
      <th style="border-bottom: 1px solid #ddd !important;" class="col-2" scope="col-2"></th>
    </tr>
    `;
    
    for( let r of data){

        tab+= `
        <tr>
            <td id="tdata">${r._id} </td>
            <td id="tdata"><span class="badge alert-success">${r.name} </span></td>
            <td class="text-end" id="tdata"><a href="User.html" style="color:  #5a67d8;text-decoration: none;"><i class="fas fa-eye"></i></a></td>
        </tr>
        `;
    }

    document.getElementById("users").innerHTML = tab;
}