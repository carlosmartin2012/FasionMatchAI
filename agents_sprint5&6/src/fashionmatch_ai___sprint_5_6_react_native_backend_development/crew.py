import os

from crewai import LLM
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import (
	ScrapeWebsiteTool
)





@CrewBase
class FashionmatchAiSprint56ReactNativeBackendDevelopmentCrew:
    """FashionmatchAiSprint56ReactNativeBackendDevelopment crew"""

    
    @agent
    def luis___senior_react_native_developer(self) -> Agent:
        
        return Agent(
            config=self.agents_config["luis___senior_react_native_developer"],
            
            
            tools=[				ScrapeWebsiteTool()],
            reasoning=False,
            max_reasoning_attempts=None,
            inject_date=True,
            allow_delegation=False,
            max_iter=25,
            max_rpm=None,
            
            max_execution_time=None,
            llm=LLM(
                model="openai/gpt-4o-mini",
                temperature=0.7,
            ),
            
        )
    
    @agent
    def jose___backend_supabase_expert(self) -> Agent:
        
        return Agent(
            config=self.agents_config["jose___backend_supabase_expert"],
            
            
            tools=[				ScrapeWebsiteTool()],
            reasoning=False,
            max_reasoning_attempts=None,
            inject_date=True,
            allow_delegation=False,
            max_iter=25,
            max_rpm=None,
            
            max_execution_time=None,
            llm=LLM(
                model="openai/gpt-4o-mini",
                temperature=0.7,
            ),
            
        )
    

    
    @task
    def generate_react_native_core_app_structure(self) -> Task:
        return Task(
            config=self.tasks_config["generate_react_native_core_app_structure"],
            markdown=False,
            
            
        )
    
    @task
    def generate_supabase_backend_configuration(self) -> Task:
        return Task(
            config=self.tasks_config["generate_supabase_backend_configuration"],
            markdown=False,
            
            
        )
    
    @task
    def generate_mobile_ui_components_and_screens(self) -> Task:
        return Task(
            config=self.tasks_config["generate_mobile_ui_components_and_screens"],
            markdown=False,
            
            
        )
    
    @task
    def implement_ai_factor_altura_system(self) -> Task:
        return Task(
            config=self.tasks_config["implement_ai_factor_altura_system"],
            markdown=False,
            
            
        )
    
    @task
    def integrate_mobile_app_with_backend(self) -> Task:
        return Task(
            config=self.tasks_config["integrate_mobile_app_with_backend"],
            markdown=False,
            
            
        )
    

    @crew
    def crew(self) -> Crew:
        """Creates the FashionmatchAiSprint56ReactNativeBackendDevelopment crew"""
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            chat_llm=LLM(model="openai/gpt-4o-mini"),
        )


