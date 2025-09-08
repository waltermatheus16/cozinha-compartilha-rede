-- Adicionar posts de exemplo para o COMSEA (kitchen_id = 0)
INSERT INTO posts (kitchen_id, type, content, likes, comments_count) VALUES
(0, 'info', '🎉 O COMSEA está lançando uma nova campanha de arrecadação de alimentos! 

Nosso objetivo é fortalecer ainda mais a rede de cozinhas solidárias de Santana do Livramento. 

📋 Como ajudar:
• Doe alimentos não perecíveis
• Participe das ações voluntárias
• Divulgue nossa causa

Juntos, podemos fazer a diferença na vida de muitas famílias! 💙', 45, 12),

(0, 'location', '📍 Reunião do COMSEA - Próxima quinta-feira!

🗓️ Data: 15 de setembro de 2024
🕐 Horário: 14h às 16h
📍 Local: Prefeitura Municipal - Sala de Reuniões

📋 Pauta:
• Aprovação do plano de ação 2024
• Relatório de atividades das cozinhas
• Novas parcerias e projetos

Todos os membros do conselho e representantes das cozinhas estão convidados!', 23, 8),

(0, 'need', '🆘 URGENTE: Precisamos de doações!

As cozinhas solidárias estão com estoque baixo dos seguintes itens:

🥫 Alimentos não perecíveis:
• Arroz (5kg)
• Feijão (2kg)
• Macarrão
• Óleo de cozinha
• Açúcar
• Sal

🥬 Alimentos frescos:
• Legumes e verduras
• Frutas da estação

📞 Entre em contato: (55) 3242-0000
📧 Email: comsea@admin.com

Sua doação faz a diferença! 🙏', 67, 15),

(0, 'info', '📊 Relatório Mensal - Agosto 2024

O COMSEA tem o prazer de apresentar os resultados do mês de agosto:

🏠 Cozinhas ativas: 22
👥 Voluntários cadastrados: 350+
🍽️ Refeições servidas: 15.420
👨‍👩‍👧‍👦 Famílias atendidas: 1.280

Estes números mostram o impacto positivo da nossa rede solidária na comunidade. 

Agradecemos a todos os voluntários, doadores e parceiros que tornam isso possível! 💪', 89, 24),

(0, 'location', '🎯 Capacitação para Voluntários

📅 Data: 22 de setembro de 2024
🕐 Horário: 9h às 17h
📍 Local: Centro Comunitário do Bairro Centro

🎓 Conteúdo:
• Segurança alimentar
• Manipulação de alimentos
• Trabalho em equipe
• Primeiros socorros

📝 Inscrições: Gratuitas
☕ Coffee break incluído

Vagas limitadas! Inscreva-se até 20/09.

📞 (55) 3242-0000', 34, 6);

-- Verificar se os posts foram inseridos
SELECT p.id, p.type, p.content, p.likes, p.comments_count, p.created_at
FROM posts p 
WHERE p.kitchen_id = 0 
ORDER BY p.created_at DESC;
