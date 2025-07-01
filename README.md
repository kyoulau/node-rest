
# 🏠 House Reservation API

API para gerenciamento de reservas de imóveis com Node.js + MongoDB


### 📋 Visão Geral

API RESTful para reservas de casas com:

    👤 Autenticação básica (senhas criptografadas com Bcrypt)

    🏠 CRUD completo de imóveis (com upload de imagens)

    📅 Sistema de reservas

    🔐 Proteção de dados sensíveis



## 🛠️ Tecnologias  

| Tecnologia | Função |  
|------------|--------|  
| Node.js | Backend JavaScript |  
| Express | Framework HTTP |  
| MongoDB | Banco de dados NoSQL |  
| Mongoose | Modelagem de dados |  
| Multer | Upload de imagens |  
| Yup | Validação de dados |  
| Bcrypt | Criptografia de senhas |  
| Dotenv | Variáveis de ambiente |  

## 🔌 Endpoints  

### 🏠 Imóveis  

| Método | Rota | Ação |  
|--------|------|------|  
| `POST` | `/houses` | Cria imóvel (com imagem) |  
| `GET` | `/houses` | Lista todos imóveis |  
| `PUT` | `/houses/:house_id` | Atualiza imóvel |  
| `GET` | `/houses/:house_id` | Detalhes do imóvel |  
| `DELETE` | `/houses/:house_id` | Remove imóvel |  

### 📅 Reservas  

| Método | Rota | Ação |  
|--------|------|------|  
| `POST` | `/houses/:house_id/reserve` | Cria reserva |  
| `DELETE` | `/houses/:house_id/reserve` | Cancela reserva |  
| `GET` | `/houses/:house_id/reserve` | Lista reservas |  

### 📊 Dashboard  

| Método | Rota | Ação |  
|--------|------|------|  
| `GET` | `/dashboard` | Dados consolidados |  

---

## 📦 Exemplo de Requisições  


```http
Criar Imóvel 
POST /houses
Content-Type: multipart/form-data

{
  "thumbnail": [FILE],
  "title": "Casa com piscina",
  "price": 1200,
  "location": "Florianópolis"
}

 Fazer reserva
POST /houses/abc123/reserve
Content-Type: application/json

{
  "user_id": "user123",
  "date": "2025-12-20"
}
