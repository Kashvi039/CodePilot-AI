from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    feature: str
    language: str
    code: str