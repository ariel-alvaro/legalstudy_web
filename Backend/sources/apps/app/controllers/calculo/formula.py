from abc import ABC, abstractmethod
from datetime import date
from math import floor


from ..enums.reason_enum import ReasonEnum
class CalculoStrategy(ABC):
    name = ''
    
    @abstractmethod
    def calculate(self, status, dateInfo, results ) -> int:
        pass      

class AntiquityCalculoStrategy(CalculoStrategy):
    name = 'antiquity'
    
    def calculate(self, status, dateInfo, results ) -> int:
 
        if (status['reason'] == ReasonEnum.SinCausa.value):
            
            if (dateInfo['months'] >= 3):
                
                return status['salary'] * (dateInfo['years'] + 1) 
            
            return status['salary'] * dateInfo['years']
        
        return 0

class NoticedSust(CalculoStrategy):
    name = 'noticedSust'
    
    def calculate(self, status, dateInfo, results ) -> int:
        
        if (status["noticed"] == False and status['reason'] == ReasonEnum.SinCausa.value or status['reason'] == ReasonEnum.Renuncia.value ):

            if (dateInfo['years'] <= 5):

                return status['salary']
            
            return 2 * status['salary'] 
        
        return 0


class DayMonth(CalculoStrategy):
    name = "dayMonth"
    
    def calculate(self, status, dateInfo, results ) -> int:
        print("ACA ->>",dateInfo["finalDay"], ( status['salary'] / 31 ) * dateInfo["finalDay"] )
        
        return ( status['salary'] / 30 ) * dateInfo["finalDay"]

class MonthIntegration(CalculoStrategy):
    name = "monthIntegration"

    def calculate(self, status, dateInfo, results ) -> int:
        if ( dateInfo['monthLastDays'] > 0):
            return ( status['salary'] / 30 ) * dateInfo['monthLastDays']
        
        return 0


class NoticedSac(CalculoStrategy):
    name = "noticedSac" 
    
    def calculate(self, status, dateInfo, results ) -> int:

        if (status["noticed"] == False and status['reason'] ==  ReasonEnum.SinCausa.value or status['reason'] == ReasonEnum.Renuncia.value):

            return ( 8.33 * results['noticedSust'] ) / 100 
        
        return 0


class ProportionalSac(CalculoStrategy):
    name = "proportionalSac"

    def calculate(self, status, dateInfo, results ) -> int:
        print(dateInfo['semesterWorkedDays'], " <-------")
        return ( (status['salary'] / 2) / 182.5 ) * dateInfo['semesterWorkedDays']
        
class Holiday(CalculoStrategy):
    name = "holiday"
    
    def calculate(self, status, dateInfo, results=None) -> int:

        percentage = 0
        
        if ( dateInfo["years"] <= 5 ):
           percentage = (dateInfo['actualYearDays'] * 14)  
        elif (dateInfo["years"] <= 10 ):
           percentage = (dateInfo['actualYearDays'] * 21)  
        elif ( dateInfo["years"] <= 20):
           percentage = (dateInfo['actualYearDays'] * 28)  
        else:
           percentage = (dateInfo['actualYearDays'] * 35) 

        return ( status['salary'] / 25 ) * (percentage / 365)

class totalSum(CalculoStrategy):
    name = "total"

    def calculate(self, status, dateInfo, results ) -> int:
        total = 0

        for key, value in results.items():
            total += value

        return total

class indemnificationProcessor:
    results = {}
    
    def __init__(self, status, dateInfo, strategies: list[CalculoStrategy]):
        self.status = status
        self.dateInfo = dateInfo
        self._strategies = strategies


    def execute(self):
        for strategie in self._strategies:
            
            result = strategie.calculate(self.status, self.dateInfo, self.results)
            self.results[strategie.name] = floor(result)

       


        
        
# hacer strategias 

