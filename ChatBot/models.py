from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_types import AgentType
import os
from dotenv import load_dotenv


load_dotenv('.env')

# import environment keys
KEY=os.getenv('KEY')
uri=os.getenv('uri')

# connect to db
database = SQLDatabase.from_uri(uri)

# create a llm
llm = ChatOpenAI(model='gpt-3.5-turbo',openai_api_key=KEY)

# tell chatgpt of db and llm being used
toolkit=SQLDatabaseToolkit(db=database, llm=llm)

# combine and execute everything
agent_executor = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    prefix='You are an A.I that is supposed to interact with my MsSQL database'
)

# # pass query
# result = agent_executor('how many users are in my db')

# print(result)
