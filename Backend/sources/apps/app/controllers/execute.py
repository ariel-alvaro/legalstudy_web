

from .calculo import date, formula 

def processCalculo(data):
  
    dates = data["dates"]
    status = data["status"]

    date_strategies = [
        date.YearsCalculo(),
        date.MonthsCalculo(),
        date.FinalDayCalculo(),
        date.MonthLastDaysCalculo(),
        date.SemesterWorkedDaysCalculo(),
        date.YearsDaysCalculo()
    ]

    calculo_strategies = [ 
        formula.AntiquityCalculoStrategy(),
        formula.DayMonth(),
        formula.MonthIntegration(),
        formula.ProportionalSac(),
        formula.Holiday(),
        formula.NoticedSust(),
        formula.NoticedSac(),
        formula.totalSum()
    ]



    dateProcessor = date.Date(dates['initial_date'], dates['final_date'], date_strategies)
    dateProcessor.execute()
  
    formulaProcessor = formula.indemnificationProcessor(status, dateProcessor.results, calculo_strategies)
    formulaProcessor.execute()

    results = formulaProcessor.results
    
    return results

    
