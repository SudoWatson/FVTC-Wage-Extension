var observer = new MutationObserver(function(mutations) {

    // Get the iframe
    let frame = document.getElementById("icims_content_iframe");
    frameContent = frame.contentWindow.document.children[0];
    
    // Get the div of jobs
    let jobs = frameContent.getElementsByClassName("container-fluid iCIMS_JobsTable")[0]
    if (jobs === undefined) return;
    jobs = jobs.getElementsByClassName("row");
    
    // Loop through each job
    for (let i = 0; i < jobs.length; i++) {
        job = jobs[i];
        jobFields = job.getElementsByClassName("iCIMS_JobHeaderGroup")[0];



        // Check that we haven't already added the fields
        for (let j = 0; j < jobFields.getElementsByTagName("dl").length; j++) {
            if (jobFields.getElementsByTagName("dl")[j].id === "WageField") return;
        }

        let payRate = "Could not find";

        // Get information from job listing
        let  xmlHttp = new XMLHttpRequest();
        let jobURL = job.getElementsByTagName("a")[0].href;
        
        xmlHttp.open( "GET", jobURL, false ); // false for synchronous request
        xmlHttp.send( null );
        let jobSite = xmlHttp.responseText;
        let jobHTML = document.createElement("div");
        jobHTML.innerHTML = jobSite;

        // Get salary pay
        let jobInfo = jobHTML.getElementsByClassName("iCIMS_JobHeaderGroup")[0].getElementsByTagName("dl");

        for (let j = 0; j < jobInfo.length; j++) {
            let infoPoint = jobInfo[j];
            let infoTitle = infoPoint.getElementsByTagName("dt")[0];
            if (infoTitle.innerText === "Salary/Rate") {
                payRate = infoPoint.getElementsByTagName("dd")[0].innerText.trim();
            }

        }
        

        // Create the info field
        let wageField = document.createElement("dl");
        wageField.id = "WageField";
        let wageTitle = document.createElement("dt");
        wageTitle.classList.add("iCIMS_JobHeaderField");
        wageTitle.innerText = "Pay";
        let wageData = document.createElement("dd");
        wageData.classList.add("iCIMS_JobHeaderData");
        let wageSpan = document.createElement("span");
        wageSpan.innerText = payRate;

        // Join all the elements
        wageData.appendChild(wageSpan);
        wageField.appendChild(wageTitle);
        wageField.appendChild(wageData);
        jobFields.appendChild(wageField);

    }
});
observer.observe(document.documentElement, { childList: true, subtree:true });