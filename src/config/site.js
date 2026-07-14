// Fonte única de verdade dos dados do restaurante e dos canais de pedido.
// Alterar aqui reflete em toda a landing page (Header, FAB, Localização, Rodapé).
export const site = {
  name: 'Matsuri Container Sushi',
  phoneDisplay: '(43) 99691-8580',
  // wa.me / tel: exigem apenas dígitos, no formato DDI(55) + DDD(43) + número
  whatsappNumber: '5543996918580',
  whatsappMessage: 'Olá! Gostaria de fazer um pedido no Matsuri Container Sushi.',
  ifoodUrl:
    'https://www.ifood.com.br/delivery/londrina-pr/matsuri-conteiner-sushi-conjunto-vivi-xavier/0f644d2d-c535-4342-abd1-c7460901e142',
  // TODO(cliente): confirmar e-mail real (placeholder mantido)
  email: 'contato@matsurisushi.com.br',
  address: {
    street: 'Av. Saul Elkind, 3665',
    neighborhood: 'Alto da Boa Vista',
    city: 'Londrina - PR',
    cep: '86030-030',
  },
};

const fullAddress = `${site.address.street} - ${site.address.neighborhood}, ${site.address.city}, ${site.address.cep}`;

// URLs derivadas (montadas uma vez, reutilizadas em todos os componentes)
export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;
export const telUrl = `tel:+${site.whatsappNumber}`;
export const ifoodUrl = site.ifoodUrl;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  fullAddress
)}`;
// Embed sem chave de API: centra o mapa pelo endereço (host www.google.com — liberado na CSP)
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  fullAddress
)}&z=16&hl=pt-BR&output=embed`;
