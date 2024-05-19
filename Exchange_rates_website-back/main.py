import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware



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


supported_currencies = ["USD", "EUR", "GBP", "CNY", "ILS"]

exchange_rates = [
    {
      'base': 'USD',
      'conversion_rates': {
        'EUR': 0.9199,
        'GBP': 0.7897,
        'CNY': 7.2183,
        'ILS': 3.6754,
      }
    },
    {
      'base': 'EUR',
      'conversion_rates': {
        'USD': 1.0873,
        'GBP': 0.8581,
        'CNY': 7.8435,
        'ILS': 3.9969,
      }
    },
    {
      'base': 'GBP',
      'conversion_rates': {
        'USD': 1.2663,
        'EUR': 1.1653,
        'CNY': 9.1345,
        'ILS': 4.6567,
      }
    },
    {
      'base': 'CNY',
      'conversion_rates': {
        'USD': 0.1385,
        'EUR': 0.1275,
        'GBP': 0.1095,
        'ILS': 0.5100,
      }
    },
    {
      'base': 'ILS',
      'conversion_rates': {
        'USD': 0.2719,
        'EUR': 0.2502,
        'GBP': 0.2148,
        'CNY': 1.9597,
      }
    }

  ]


# get supported currencies
@app.get("/currencies")
async def get_supported_currencies():
    return {"currencies": supported_currencies}

# get exchange_rates of specific currency
@app.get("/exchange_rates/{base_currency}")
async def get_exchange_rates_by_base_currency(base_currency: str):
    matching_rate = None
    for rate in exchange_rates:
        if rate['base'] == base_currency:
            matching_rate = rate
            break

    if matching_rate:
        return {"exchange_rates": matching_rate}
    else:
        return {"exchange_rates": 'None'}


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Hello"}

# turn up the API app
if __name__ == '__main__':
  uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, access_log=True)




