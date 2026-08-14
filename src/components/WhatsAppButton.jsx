import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {

  const phone = "9440662905";

  const message =
    "Hi, I'm interested in your photography services. I would like to know more.";

  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={21} />

      <span>
        WhatsApp
      </span>

    </a>
  );
}