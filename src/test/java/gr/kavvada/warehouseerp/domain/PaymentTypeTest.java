package gr.kavvada.warehouseerp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import gr.kavvada.warehouseerp.web.rest.TestUtil;

public class PaymentTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentType.class);
        PaymentType paymentType1 = new PaymentType();
        paymentType1.setId(1L);
        PaymentType paymentType2 = new PaymentType();
        paymentType2.setId(paymentType1.getId());
        assertThat(paymentType1).isEqualTo(paymentType2);
        paymentType2.setId(2L);
        assertThat(paymentType1).isNotEqualTo(paymentType2);
        paymentType1.setId(null);
        assertThat(paymentType1).isNotEqualTo(paymentType2);
    }
}
