# ai-travel-planner-be

pipeline {
    agent any 
    
    stages { 
        stage('SCM Checkout') {
            steps {
                retry(3) {
                    git branch: 'devlopment', url: 'https://github.com/Dinuthk/ai-travel-planner-be/tree/main/server'
                }
            }
        }
        stage('Build Docker Image') {
            steps {  
                bat 'docker build -t dinuth324/ai-travel-be:%BUILD_NUMBER% .'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'travel-docker', variable: 'traveldocker')]) {
                    script {
                        bat "docker login -u dinuth324 -p %Abm4699#TT%"
                    }
                }
            }
        }
        stage('Push Image') {
            steps {
                bat 'docker push dinuth324/ai-travel-be:%BUILD_NUMBER%'
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}