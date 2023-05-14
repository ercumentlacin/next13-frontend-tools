import z from "zod";

const CreatePostDrawerSchema = z.object({
  title: z
    .string({
      required_error: "Başlık zorunludur.",
      invalid_type_error: "Başlık string olmalıdır.",
    })
    .min(2, "Kullanıcı adı en az 2 karakter olmalıdır.")
    .max(20, "Kullanıcı adı en fazla 20 karakter olmalıdır."),

  link: z
    .string({
      required_error: "Link zorunludur.",
      invalid_type_error: "Link string olmalıdır.",
    })
    .url("Link geçerli bir url olmalıdır"),

  description: z
    .string({
      required_error: "Açıklama zorunludur.",
      invalid_type_error: "Açıklama string olmalıdır.",
    })
    .min(6, "Açıklama en az 6 en fazla 20 karakter olmalıdır."),

  tags: z
    .string({
      required_error: "Etiketler zorunludur.",
      invalid_type_error: "Etiketler string olmalıdır.",
    })
    .min(1, "En az bir etiket girmelisiniz.")
    .transform((data) => data.split(",").map((tag) => tag.trim()))
    .or(z.array(z.string())),
});

export type CreatePostDrawerSchema = z.infer<typeof CreatePostDrawerSchema>;
export default CreatePostDrawerSchema;
