import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import urllib.request
import json

import data


# init app
app = FastAPI()

# allow front cors
origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# # get supported currencies
# @app.get("/currencies")
# async def get_supported_currencies():
#     return {"currencies": data.supported_currencies}


# get supported currencies - real data
@app.get("/currencies")
async def get_supported_currencies():
    currencies = []
    response = await get_exchange_rates_by_base_currency("USD")
    data = response["exchange_rates"]
    for currency in data:
        currencies.append(currency)
    return {"currencies": currencies}


# # get exchange_rates of specific currency - fake data
# @app.get("/exchange_rates/{base_currency}")
# async def get_exchange_rates_by_base_currency(base_currency: str):
#     return {"exchange_rates":data.exchange_rates[base_currency]}

# get exchange_rates of specific currency - real data from out server
@app.get("/exchange_rates/{base_currency}")
async def get_exchange_rates_by_base_currency(base_currency: str):
    api_key = '210899f1a6836ea58e846b0d'
    url = f'https://v6.exchangerate-api.com/v6/{api_key}/latest/{base_currency}'
    response = urllib.request.urlopen(url).read()
    # Decode the response from bytes to a string
    response_string = response.decode('utf-8')
    # Load the JSON string into a dictionary
    data = json.loads(response_string)
    # return {"exchange_rates":data.conversion_rates}
    return {"exchange_rates":data["conversion_rates"]}


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello"}

# turn up the API app
if __name__ == '__main__':
  uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, access_log=True)

