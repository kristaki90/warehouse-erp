package gr.kavvada.warehouseerp.service.dto;
import gr.kavvada.warehouseerp.domain.PaymentType;

/**
 * A PaymentTypeCountDTO.
 */
public class PaymentTypeCountDTO {

    private PaymentType paymentType;
    private Long count;

    public PaymentTypeCountDTO() {
    }

    public PaymentTypeCountDTO(PaymentType paymentType, Long count) {
        this.paymentType = paymentType;
        this.count = count;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
