from bs4 import BeautifulSoup
import requests

"""
On extension run, get data for all jobs. Whenever dom updates, add data to display
"""


#                                                            pr=(pageNumber)
mainURL = "https://student-casual-fvtc.icims.com/jobs/search?pr=2&amp&in_iframe=1&in_iframe=1"
pageResponse = requests.get(mainURL).text

soup = BeautifulSoup(pageResponse, "html.parser")
jobs = soup.find("div", class_="iCIMS_JobsTable")

for job in jobs.findAll("a", "iCIMS_Anchor"):
    print("\n\n")
    print(job.find("h2").text.replace('\n', ''))  # Job Title

    url=job["href"]  # URL to Job Listing

    pageResponse = requests.get(url).text
    soup = BeautifulSoup(pageResponse, "html.parser")
    soup = soup.find("div", class_="iCIMS_JobHeaderGroup")

    for section in soup.findAll("dl"):
        field = section.find("dt").text
        data = section.find("dd").text
        if "Hours Per Week".lower() in field.lower():
            print(data.replace("\n", ""))  # Hours per week
        elif "Salary".lower() in field.lower():
            print(data.replace("\n", ""))  # Salary

