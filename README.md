FinanzasMJ — Plataforma de Control FinancieroEste proyecto es una aplicación frontend desarrollada con React y Vite, enfocada en la gestión de finanzas personales. La aplicación permite el seguimiento de activos y la visualización de reportes mediante una interfaz moderna y eficiente.

Características Principales:
Gestión de Autenticación: Sistema de acceso y registro de usuarios mediante Context API.
Dashboard Financiero: Panel principal para la visualización de datos y transacciones.
Consumo de Servicios: Integración con API externa para la persistencia de datos.

Tecnologías Utilizadas
React.js: Biblioteca principal para la construcción de interfaces de usuario.
Vite: Herramienta de construcción y entorno de desarrollo.
Axios: Cliente para la ejecución de peticiones HTTP.
React Router: Gestión de la navegación y protección de rutas.
CSS3: Estilos personalizados con arquitectura modular.

Arquitectura de Carpetas
El proyecto sigue una estructura organizada por módulos y servicios:
src/
├── assets/        # Recursos estáticos
├── dashboard/     # Lógica y vistas del panel principal
├── features/      # Funcionalidades específicas (Auth, Context)
├── hooks/         # Lógica reutilizable (useValidation)
├── pages/         # Vistas generales de la aplicación
├── services/      # Servicios de API (authService, transactionService)
├── layout/        # Estructura visual base
├── shared/        # Componentes y estilos globales
├── App.jsx        # Configuración de rutas
└── main.jsx       # Punto de entrada de la aplicación
Instalación y Ejecución
Para configurar el proyecto en un entorno local, ejecute los siguientes comandos:
Clonación del repositorio:git clone https://github.com/danielaBSTARS/fronteadREACTfinal.git
Instalación de dependencias:npm install Ejecución en desarrollo:npm run dev

Datos del Autor
Nombre: Daniela Bonilla Urrego
Fecha de nacimiento: 7 de febrero de 2006
rigen: Medellín, Colombia
Perfil: Estudiante de ADSO (Análisis y Desarrollo de Software) en el SENAGitHub: danielaBSTARS

