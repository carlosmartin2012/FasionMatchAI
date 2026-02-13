import os

from crewai import LLM
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import (
	SerperDevTool,
	ScrapeWebsiteTool,
	FileReadTool
)





@CrewBase
class FashionmatchAiCompleteTechnicalImplementationAutomationCrew:
    """FashionmatchAiCompleteTechnicalImplementationAutomation crew"""

    
    @agent
    def emilio___pmo_y_technical_program_manager(self) -> Agent:
        
        return Agent(
            config=self.agents_config["emilio___pmo_y_technical_program_manager"],
            
            
            tools=[				SerperDevTool(),
				ScrapeWebsiteTool()],
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
    def francisco___senior_backend_developer_y_product_manager(self) -> Agent:
        
        return Agent(
            config=self.agents_config["francisco___senior_backend_developer_y_product_manager"],
            
            
            tools=[				SerperDevTool(),
				ScrapeWebsiteTool()],
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
    def jose_antonio___tech_lead_y_react_native_developer(self) -> Agent:
        
        return Agent(
            config=self.agents_config["jose_antonio___tech_lead_y_react_native_developer"],
            
            
            tools=[				SerperDevTool(),
				ScrapeWebsiteTool()],
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
    def millan___ux_ui_designer_y_ai_integration_specialist(self) -> Agent:
        
        return Agent(
            config=self.agents_config["millan___ux_ui_designer_y_ai_integration_specialist"],
            
            
            tools=[				SerperDevTool(),
				ScrapeWebsiteTool()],
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
    def luis___senior_react_native_code_generator(self) -> Agent:
        
        return Agent(
            config=self.agents_config["luis___senior_react_native_code_generator"],
            
            
            tools=[				ScrapeWebsiteTool(),
				FileReadTool()],
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
    def jose___backend_infrastructure_code_architect(self) -> Agent:
        
        return Agent(
            config=self.agents_config["jose___backend_infrastructure_code_architect"],
            
            
            tools=[				ScrapeWebsiteTool(),
				FileReadTool()],
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
    def gonzalo___devops_and_automation_code_generator(self) -> Agent:
        
        return Agent(
            config=self.agents_config["gonzalo___devops_and_automation_code_generator"],
            
            
            tools=[				ScrapeWebsiteTool(),
				FileReadTool()],
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
    def sprint_planning___code_analysis_and_architecture_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["sprint_planning___code_analysis_and_architecture_assessment"],
            markdown=False,
            
            
        )
    
    @task
    def backend_infrastructure___supabase_setup_and_retailers_api_integration(self) -> Task:
        return Task(
            config=self.tasks_config["backend_infrastructure___supabase_setup_and_retailers_api_integration"],
            markdown=False,
            
            
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
    def mobile_app_development___react_native_migration_and_core_features(self) -> Task:
        return Task(
            config=self.tasks_config["mobile_app_development___react_native_migration_and_core_features"],
            markdown=False,
            
            
        )
    
    @task
    def generate_mobile_ui_components_and_screens(self) -> Task:
        return Task(
            config=self.tasks_config["generate_mobile_ui_components_and_screens"],
            markdown=False,
            
            
        )
    
    @task
    def generate_ai_integration_and_factor_altura_system(self) -> Task:
        return Task(
            config=self.tasks_config["generate_ai_integration_and_factor_altura_system"],
            markdown=False,
            
            
        )
    
    @task
    def ai_systems_development___factor_altura_and_smart_recommendations(self) -> Task:
        return Task(
            config=self.tasks_config["ai_systems_development___factor_altura_and_smart_recommendations"],
            markdown=False,
            
            
        )
    
    @task
    def generate_complete_ci_cd_pipeline_and_devops_setup(self) -> Task:
        return Task(
            config=self.tasks_config["generate_complete_ci_cd_pipeline_and_devops_setup"],
            markdown=False,
            
            
        )
    
    @task
    def production_deployment_and_scalability_setup(self) -> Task:
        return Task(
            config=self.tasks_config["production_deployment_and_scalability_setup"],
            markdown=False,
            
            
        )
    

    @crew
    def crew(self) -> Crew:
        """Creates the FashionmatchAiCompleteTechnicalImplementationAutomation crew"""
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            chat_llm=LLM(model="openai/gpt-4o-mini"),
        )


