from abc import ABC, abstractmethod 
from datetime import datetime
from math import floor

import calendar 


def convertToDate(date: str):
    return datetime.strptime(date, "%Y-%m-%d")

#Strategy Pattern
class DateCalculoStrategy(ABC):
    name: str

    @abstractmethod
    def calculate(self, initialDate , finalDate):
        pass


class YearsCalculo(DateCalculoStrategy):
    name = "years"

    def calculate(self, initialDate, finalDate):
        time = finalDate - initialDate
        
        return time.days / 365 

class MonthsCalculo(DateCalculoStrategy):
    name = "months"
     
    def calculate(self, initialDate, finalDate):
        time = finalDate - initialDate
         
        return time.days / 30  

class FinalDayCalculo(DateCalculoStrategy):
    name = "finalDay"
    def calculate(self, initialDate, finalDate):
        return finalDate.day   
    
class MonthLastDaysCalculo(DateCalculoStrategy):
    name = "monthLastDays"

    def calculate(self, initialDate, finalDate):
        last_day = calendar.monthrange(finalDate.year, finalDate.month)[1]

        return last_day - finalDate.day

class SemesterWorkedDaysCalculo(DateCalculoStrategy):
    name = "semesterWorkedDays"

    def calculate(self, initialDate, finalDate):
        floorDate = initialDate
        roofDate = finalDate
        

        if ( initialDate.month < 7 ):
            floorDate = convertToDate(f'{finalDate.year}-1-1')
        else:
            floorDate = convertToDate(f'{finalDate.year}-6-30')

        
        return (roofDate - floorDate).days


class YearsDaysCalculo(DateCalculoStrategy):
    name = "actualYearDays"
    
    def calculate(self, initialDate, finalDate):
        floorDate = convertToDate(f'{finalDate.year}-1-1')

        return (finalDate - floorDate).days

class Date():
    results = {}

    def __init__(self, initialDate:str , finalDate:str, strategies: list[DateCalculoStrategy]) -> None:
        print(initialDate, finalDate, "<--------")
        self.initialDate = convertToDate(initialDate)
        self.finalDate = convertToDate(finalDate)
        self._strategies = strategies
        
    

    def execute(self):

        for strategie in self._strategies:
            
            result = strategie.calculate(self.initialDate, self.finalDate)
            
            self.results[strategie.name] = floor(result)  






